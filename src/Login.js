import React from 'react';
import './Register.css';

const Login = () => {
    const [lastName, setLastName] = React.useState('');
    const [firstName, setFirstName] = React.useState('');
    const [telephone, setTelephone] = React.useState('');
    const [dateOfBirth, setDateOfBirth] = React.useState('');
    const [gender, setGender] = React.useState('Prefer not to say');
    const [email, setEmail] = React.useState('');
    const [hashedPassword, setHashedPassword] = React.useState('');
    const [preferredLanguage, setPreferredLanguage] = React.useState('English');
    const [profession, setProfession] = React.useState('');
    const [hobbiesInterests, setHobbiesInterests] = React.useState('');
    const [emergencyContact, setEmergencyContact] = React.useState('');
    const [profilePhoto, setProfilePhoto] = React.useState('');
    const [notificationPreferences, setNotificationPreferences] = React.useState('Email');
    const [role, setRole] = React.useState('Passenger');
    
    const [violations, setViolations] = React.useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setViolations([]);

        const user = {
            lastName: lastName,
            firstName: firstName,
            telephone: telephone,
            dateOfBirth: dateOfBirth,
            gender: gender === 'Prefer not to say' ? null : gender,
            email: email,
            hashedPassword: hashedPassword,
            preferredLanguage: preferredLanguage,
            profession: profession,
            hobbiesInterests: hobbiesInterests,
            emergencyContact: emergencyContact,
            profilePhoto: profilePhoto,
            notificationPreferences: notificationPreferences,
            role: role
        };

        fetch('http://localhost:8083/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (data.message !== undefined) {
                    alert(data.message);
                } else if (data.violations!== undefined) {
                    setViolations(data.violations);
                }
            });
    }

    return (
        <>
            <div className="container">
                <h1>Login into an account</h1>
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
