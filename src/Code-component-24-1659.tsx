<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Test Login - Sistema Bomberos</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            line-height: 1.6;
        }
        .test-section {
            background: #f8f9fa;
            padding: 20px;
            margin: 20px 0;
            border-radius: 8px;
            border-left: 4px solid #007bff;
        }
        .success { border-left-color: #28a745; background: #d4f5d4; }
        .error { border-left-color: #dc3545; background: #f5d4d4; }
        button {
            background: #007bff;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            margin: 5px;
        }
        button:hover { background: #0056b3; }
        .result { margin-top: 10px; padding: 10px; border-radius: 5px; }
        input { width: 100%; padding: 8px; margin: 5px 0; }
    </style>
</head>
<body>
    <h1>🚒 Test de Login - Sistema Bomberos</h1>
    
    <div class="test-section">
        <h3>🧪 Test Manual de Autenticación</h3>
        <form id="loginForm">
            <div>
                <label>Email:</label>
                <input type="email" id="email" placeholder="admin@bomberos.cl">
            </div>
            <div>
                <label>Password:</label>
                <input type="password" id="password" placeholder="123456">
            </div>
            <button type="submit">Probar Login</button>
        </form>
        <div id="manualResult"></div>
    </div>

    <div class="test-section">
        <h3>🔧 Tests Automáticos</h3>
        <button onclick="testAuthFunction()">Test Función de Autenticación</button>
        <button onclick="testLocalStorage()">Test LocalStorage</button>
        <button onclick="testEmailValidation()">Test Validación Email</button>
        <button onclick="testAllUsers()">Test Todos los Usuarios</button>
        <div id="autoResult"></div>
    </div>

    <div class="test-section">
        <h3>📋 Usuarios de Prueba</h3>
        <div>
            <button onclick="fillLogin('admin@bomberos.cl', '123456')">🔑 Administrador</button>
            <button onclick="fillLogin('director@bomberos.cl', '123456')">🎖️ Director</button>
            <button onclick="fillLogin('juan.perez@gmail.com', '123456')">🚒 Bombero</button>
        </div>
    </div>

    <script>
        // SIMULACIÓN DE FUNCIONES DEL SISTEMA
        const MOCK_USERS = [
            {
                id: '1',
                nombre: 'Admin',
                apellidos: 'Sistema',
                email: 'admin@bomberos.cl',
                rut: '11111111-1',
                rol: 'Administrador',
                isAuthenticated: true
            },
            {
                id: '2',
                nombre: 'Carlos',
                apellidos: 'Rodríguez',
                email: 'director@bomberos.cl',
                rut: '12345678-9',
                rol: 'Director',
                isAuthenticated: true
            },
            {
                id: '3',
                nombre: 'Juan',
                apellidos: 'Pérez',
                email: 'juan.perez@gmail.com',
                rut: '98765432-1',
                rol: 'Bombero Activo',
                isAuthenticated: true
            }
        ];

        function validateEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) return false;
            
            const allowedDomains = ['@bomberos.cl', '@gmail.com', '@outlook.com'];
            return allowedDomains.some(domain => email.endsWith(domain));
        }

        function authenticateUser(email, password) {
            console.log(`[TEST] Intentando autenticar: ${email}`);
            
            const user = MOCK_USERS.find(u => u.email === email);
            
            if (user && password === '123456') {
                console.log(`[TEST] ✅ Usuario autenticado: ${user.nombre} ${user.apellidos} (${user.rol})`);
                return user;
            }
            
            console.log(`[TEST] ❌ Credenciales inválidas para: ${email}`);
            return null;
        }

        // LLENAR FORMULARIO DE LOGIN
        function fillLogin(email, password) {
            document.getElementById('email').value = email;
            document.getElementById('password').value = password;
        }

        // TEST MANUAL DE LOGIN
        document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const result = document.getElementById('manualResult');
            
            console.log(`[MANUAL TEST] Email: ${email}, Password: ${password}`);
            
            if (!email || !password) {
                result.innerHTML = '<div class="result error">❌ Complete todos los campos</div>';
                return;
            }
            
            if (!validateEmail(email)) {
                result.innerHTML = '<div class="result error">❌ Email inválido</div>';
                return;
            }
            
            const user = authenticateUser(email, password);
            
            if (user) {
                result.innerHTML = `<div class="result success">✅ Login exitoso: ${user.nombre} ${user.apellidos} (${user.rol})</div>`;
            } else {
                result.innerHTML = '<div class="result error">❌ Credenciales inválidas</div>';
            }
        });

        // TESTS AUTOMÁTICOS
        function testAuthFunction() {
            const result = document.getElementById('autoResult');
            let html = '<h4>Test de Autenticación:</h4>';
            
            // Test casos exitosos
            MOCK_USERS.forEach(user => {
                const auth = authenticateUser(user.email, '123456');
                if (auth) {
                    html += `<div class="result success">✅ ${user.email} - OK</div>`;
                } else {
                    html += `<div class="result error">❌ ${user.email} - FALLO</div>`;
                }
            });
            
            // Test casos de fallo
            const testFail = authenticateUser('invalid@test.com', '123456');
            if (!testFail) {
                html += '<div class="result success">✅ Rechazo de email inválido - OK</div>';
            } else {
                html += '<div class="result error">❌ Debería rechazar email inválido</div>';
            }
            
            const testWrongPass = authenticateUser('admin@bomberos.cl', 'wrong');
            if (!testWrongPass) {
                html += '<div class="result success">✅ Rechazo de password inválido - OK</div>';
            } else {
                html += '<div class="result error">❌ Debería rechazar password inválido</div>';
            }
            
            result.innerHTML = html;
        }

        function testLocalStorage() {
            const result = document.getElementById('autoResult');
            try {
                const testData = { test: 'ok', timestamp: Date.now() };
                localStorage.setItem('bomberosTest', JSON.stringify(testData));
                const retrieved = JSON.parse(localStorage.getItem('bomberosTest'));
                localStorage.removeItem('bomberosTest');
                
                if (retrieved && retrieved.test === 'ok') {
                    result.innerHTML = '<div class="result success">✅ LocalStorage funcionando correctamente</div>';
                } else {
                    result.innerHTML = '<div class="result error">❌ Error en LocalStorage</div>';
                }
            } catch (e) {
                result.innerHTML = `<div class="result error">❌ LocalStorage no disponible: ${e.message}</div>`;
            }
        }

        function testEmailValidation() {
            const result = document.getElementById('autoResult');
            let html = '<h4>Test de Validación de Email:</h4>';
            
            const testCases = [
                { email: 'admin@bomberos.cl', expected: true },
                { email: 'user@gmail.com', expected: true },
                { email: 'test@outlook.com', expected: true },
                { email: 'invalid@yahoo.com', expected: false },
                { email: 'notanemail', expected: false },
                { email: '', expected: false }
            ];
            
            testCases.forEach(test => {
                const result = validateEmail(test.email);
                const status = result === test.expected ? '✅' : '❌';
                html += `<div class="result ${result === test.expected ? 'success' : 'error'}">${status} ${test.email || '(vacío)'} - ${result ? 'Válido' : 'Inválido'}</div>`;
            });
            
            result.innerHTML = html;
        }

        function testAllUsers() {
            const result = document.getElementById('autoResult');
            let html = '<h4>Test de Todos los Usuarios:</h4>';
            
            MOCK_USERS.forEach(user => {
                html += `<div class="result success">👤 ${user.nombre} ${user.apellidos}<br>📧 ${user.email}<br>🏷️ ${user.rol}<br>🆔 RUT: ${user.rut}</div>`;
            });
            
            result.innerHTML = html;
        }

        // Ejecutar test básico al cargar
        window.onload = function() {
            console.log('🚒 Sistema de Test de Login cargado');
            testLocalStorage();
        };
    </script>
</body>
</html>