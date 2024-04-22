import React from 'react';
import './Register.css';

const Register = () => {
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
                <h1>Register an account</h1>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="label-field">
                        <label htmlFor="lastName">Last Name:</label>
                        <input name="lastName" id="lastName" type="text" onChange={(e) => setLastName(e.target.value)} value={lastName}/>
                    </div>

                    <div className="label-field">
                        <label htmlFor="firstName">First Name:</label>
                        <input name="firstName" id="firstName" type="text" onChange={(e) => setFirstName(e.target.value)} value={firstName}/>
                    </div>

                    <div className="label-field">
                        <label htmlFor="telephone">Telephone Number:</label>
                        <input name="telephone" id="telephone" type="tel" onChange={(e) => setTelephone(e.target.value)} value={telephone}/>
                    </div>

                    <div className="label-field">
                        <label htmlFor="gender">Gender:</label>
                        <select name="gender" id="gender" onChange={(e) => setGender(e.target.value)} value={gender}>
                            <option value="Female">Female</option>
                            <option value="Male">Male</option>
                            <option value="Other">Other</option>
                            <option value="Prefer not to say">Prefer not to say</option>
                        </select>
                    </div>

                    <div className="label-field">
                        <label htmlFor="dateOfBirth">Date of Birth:</label>
                        <input name="dateOfBirth" id="dateOfBirth" type="date" onChange={(e) => setDateOfBirth(e.target.value)} value={dateOfBirth}/>
                    </div>

                    <div className="label-field">
                        <label htmlFor="email">Email:</label>
                        <input name="email" id="email" type="email" onChange={(e) => setEmail(e.target.value)} value={email}/>
                    </div>

                    <div className="label-field">
                        <label htmlFor="hashedPassword">Password:</label>
                        <input name="hashedPassword" id="hashedPassword" type="password" onChange={(e) => setHashedPassword(e.target.value)} value={hashedPassword}/>
                    </div>

                    <div className="label-field">
                        <label htmlFor="preferredLanguage">Preferred Language:</label>
                        <select name="preferredLanguage" id="preferredLanguage" onChange={(e) => setPreferredLanguage(e.target.value)} value={preferredLanguage}>
                            <option value="English">English</option>
                            <option value="French">French</option>
                        </select>
                    </div>

                    <div className="label-field">
                        <label htmlFor="profession">Profession:</label>
                        <input name="profession" id="profession" type="text" onChange={(e) => setProfession(e.target.value)} value={profession}/>
                    </div>

                    <div className="label-field">
                        <label htmlFor="hobbiesInterests">Hobbies and Interests:</label>
                        <input name="hobbiesInterests" id="hobbiesInterests" type="text" onChange={(e) => setHobbiesInterests(e.target.value)} value={hobbiesInterests}/>
                    </div>

                    <div className="label-field">
                        <label htmlFor="emergencyContact">Emergency Contact:</label>
                        <input name="emergencyContact" id="emergencyContact" type="text" onChange={(e) => setEmergencyContact(e.target.value)} value={emergencyContact}/>
                    </div>

                    <div className="label-field">
                        <label htmlFor="profilePhoto">Profile Photo:</label>
                        <input name="profilePhoto" id="profilePhoto" type="text" onChange={(e) => setProfilePhoto(e.target.value)} value={profilePhoto}/>
                    </div>

                    <div className="label-field">
                        <label htmlFor="notificationPreferences">Notification Preferences:</label>
                        <select name="notificationPreferences" id="notificationPreferences" onChange={(e) => setNotificationPreferences(e.target.value)} value={notificationPreferences}>
                            <option value="Email">Email</option>
                            <option value="SMS">SMS</option>
                            <option value="Push_Notification">Push Notification</option>
                        </select>
                    </div>

                    <div className="label-field">
                        <label htmlFor="role">Role:</label>
                        <select name="role" id="role" onChange={(e) => setRole(e.target.value)} value={role}>
                            <option value="Driver">Driver</option>
                            <option value="Passenger">Passenger</option>
                        </select>
                    </div>

                    <div className="button-container">
                        <button type="submit">Register</button>
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

export default Register;

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
