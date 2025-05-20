from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import matplotlib
# Agg is a non-interactive backend that renders to image buffers, not the screen.
# It's thread-safe and works well in Flask, FastAPI, etc
# For screen rendering we would use 'QtAgg'
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import yfinance as yf
from prophet import Prophet
import pandas as pd
import io
import base64

app = Flask(__name__, static_folder='../client/build', static_url_path='')
CORS(app)

@app.route('/')
def serve_index():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    if os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

@app.route('/api/forecast-stock', methods=['POST'])
def forecast_stock():
    data = request.get_json()
    ticker = data.get('ticker', 'AAPL')
    days = int(data.get('days', 90))

    df = yf.download(ticker, period="1y", interval="1d", group_by='ticker', auto_adjust=False).reset_index()

    '''
    Ticker       Date        AAPL                                                          
    Price                    Open        High         Low       Close   Adj Close    Volume
    0      2024-05-17  189.509995  190.809998  189.179993  189.869995  188.986160  41282900
    1      2024-05-20  189.330002  191.919998  189.009995  191.039993  190.150726  44361300
    2      2024-05-21  191.089996  192.729996  190.919998  192.350006  191.454636  42309400
    '''
    print(df)

    '''
    MultiIndex([('Date',          ''),
                ('AAPL',      'Open'),
                ('AAPL',      'High'),
                ('AAPL',       'Low'),
                ('AAPL',     'Close'),
                ('AAPL', 'Adj Close'),
                ('AAPL',    'Volume')],
            names=['Ticker', 'Price'])
    '''
    print(df.columns)
    # Combine both levels of the MultiIndex into a single name: tuple ('Close', 'AAPL') -> AAPL_Close
    # Using list comprehension:
    df.columns = ['_'.join(col).strip() if isinstance(col, tuple) else col for col in df.columns]

    '''
    Index(['Date_', 'AAPL_Open', 'AAPL_High', 'AAPL_Low', 'AAPL_Close',
        'AAPL_Adj Close', 'AAPL_Volume'],
        dtype='object')
    '''
    print(df.columns)

    # Use correct column names based on actual output
    df = df[['Date_', f'{ticker}_Close']].copy()
    df.rename(columns={'Date_': 'ds', f'{ticker}_Close': 'y'}, inplace=True)

    # Prophet expects the DataFrame to have two specific columns with the correct types and no missing values
    # Converts df['ds'] to datetime
    # https://pandas.pydata.org/docs/reference/api/pandas.to_datetime.html
    df['ds'] = pd.to_datetime(df['ds'])
    # Converts df['y'] to numeric
    # https://pandas.pydata.org/docs/reference/api/pandas.to_numeric.html
    df['y'] = pd.to_numeric(df['y'], errors='coerce')
    # Drop missing values if any
    df.dropna(inplace=True)

    # Preview
    '''
            ds           y
    0 2024-05-17  189.869995
    1 2024-05-20  191.039993
    2 2024-05-21  192.350006
    3 2024-05-22  190.899994
    4 2024-05-23  186.880005
    '''
    print(df.head())

    # Forecast
    # https://facebook.github.io/prophet/docs/quick_start.html#python-api
    # daily seasonality is disabled by default - we enable it
    model = Prophet(daily_seasonality=True)
    # fit the model by instantiating a new Prophet object
    model.fit(df)

    future = model.make_future_dataframe(periods=days)
    forecast = model.predict(future)
    '''
    ds       trend  yhat_lower  yhat_upper  ...  multiplicative_terms  multiplicative_terms_lower  multiplicative_terms_upper        yhat
    0   2024-05-17  190.171440  181.133433  203.786881  ...                   0.0                         0.0                         0.0  193.122410
    1   2024-05-20  191.514255  183.320068  204.513006  ...                   0.0                         0.0                         0.0  193.994008
    2   2024-05-21  191.961860  183.983963  206.600724  ...                   0.0                         0.0                         0.0  195.059550
    3   2024-05-22  192.409465  184.508703  206.984988  ...                   0.0                         0.0                         0.0  195.327960
    4   2024-05-23  192.857070  184.930756  206.116765  ...                   0.0                         0.0                         0.0  195.479275
    '''
    print(forecast)

    # Plot forecast
    fig = model.plot(forecast)
    # plt.title(f"{ticker} Forecast for {days} Days")

    buf = io.BytesIO()
    # save to a buffer
    plt.savefig(buf, format='png')
    plt.close(fig)
    # beginning of the buffer
    buf.seek(0)

    #base64 encoded image
    img_base64 = base64.b64encode(buf.read()).decode('utf-8')
    return jsonify({'image_base64': img_base64})

if __name__ == "__main__":
    app.run(debug=True)
