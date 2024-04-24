import React from 'react';
import './Login.css';

const Login = () => {
    const [email, setEmail] = React.useState('');
    const [hashedPassword, setHashedPassword] = React.useState('');
    
    const [violations, setViolations] = React.useState([]);

    const [user, setUser] = React.useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        setViolations([]);

        const user = {
            email: email,
            hashedPassword: hashedPassword,
        };

        fetch('http://localhost:8083/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                //alert(JSON.stringify(data.user));
                
                switch (data.success) {
                    case true:
                        setUser(JSON.parse(data.user));
                        break;
                    case false:
                        alert(data.message);
                        break;
                    case undefined:
                        setViolations(data.violations);
                        break;
                    default:
                        break;
                }
            });
    }

    return (
        <>
            <div className="container">
                <h1>Login</h1>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="label-field">
                        <label htmlFor="email">Email:</label>
                        <input name="email" id="email" type="email" onChange={(e) => setEmail(e.target.value)} value={email}/>
                    </div>

                    <div className="label-field">
                        <label htmlFor="hashedPassword">Password:</label>
                        <input name="hashedPassword" id="hashedPassword" type="password" onChange={(e) => setHashedPassword(e.target.value)} value={hashedPassword}/>
                    </div>

                    <div className="button-container">
                        <button type="submit">Login</button>
                    </div>
                </form>
            </div>

            {user != null && <h1>Welcome {user.firstName}!</h1>}

            {violations.length > 0 &&
                <div className="violations-container">
                    <div className="violation-card">
                        {violations.map((violation, index) => (
                            <p key={index} className="violation-message">{violation.message}</p>
                        ))}
                    </div>
                </div>
            }
        </>
    );
};

export default Login;

/* Fields to add to form
{
    "lastName": "Valois",
    "firstName": "ArRianNe",
    "telephone": "1234567890",
    "dateOfBirth": "2003-09-09",
    "gender": "Female",
    "email": "uwu@uwu.com",
    "hashedPassword": "ass123As$",
    "registrationDate": "2024-04-19T12:00:00",
    "preferredLanguage": "Francis",
    "profession": "Depressive",
    "hobbiesInterests": "minecraft",
    "emergencyContact": "Alpha please salvation - 0987654321",
    "profilePhoto": "https://example.com/profile-photo.jpg",
    "notificationPreferences": "Email",
    "isActive": "TRUE",
    "role": "Driver"
}
*/
