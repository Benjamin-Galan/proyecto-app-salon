<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Nuevo mensaje de contacto</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
            background-color: #f9f9f9;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background: #fff;
            padding: 40px;
            border-radius: 12px;
            box-shadow: 0 4px 10px rgba(0,0,0,0.05);
            border: 1px solid #eee;
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
        }
        .header h1 {
            color: #7c3aed; /* beauty-deep equivalent */
            margin: 0;
            font-size: 24px;
        }
        .content {
            margin-bottom: 30px;
        }
        .field {
            margin-bottom: 20px;
        }
        .label {
            font-weight: bold;
            color: #6d28d9;
            display: block;
            margin-bottom: 5px;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        .value {
            font-size: 16px;
            color: #444;
            background: #fdfaff;
            padding: 10px 15px;
            border-radius: 8px;
            border-left: 4px solid #ddd6fe;
        }
        .footer {
            text-align: center;
            font-size: 12px;
            color: #888;
            border-top: 1px solid #eee;
            padding-top: 20px;
        }
    </style>
</head>
<body>
    <div className="container">
        <div className="header">
            <h1>Nuevo Mensaje de Contacto</h1>
            <p>Has recibido un nuevo mensaje desde el formulario web.</p>
        </div>

        <div className="content">
            <div className="field">
                <span className="label">Nombre:</span>
                <div className="value">{{ $data['name'] }}</div>
            </div>

            <div className="field">
                <span className="label">Email:</span>
                <div className="value">{{ $data['email'] }}</div>
            </div>

            @if(!empty($data['phone']))
            <div className="field">
                <span className="label">Teléfono:</span>
                <div className="value">{{ $data['phone'] }}</div>
            </div>
            @endif

            <div className="field">
                <span className="label">Mensaje:</span>
                <div className="value" style="white-space: pre-wrap;">{{ $data['message'] }}</div>
            </div>
        </div>

        <div className="footer">
            <p>Este correo fue enviado automáticamente por el sistema de contacto de Salon App.</p>
        </div>
    </div>
</body>
</html>
