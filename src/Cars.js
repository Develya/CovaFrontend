import React, { useState, useEffect } from 'react';
import './Cars.css';

function Cars() {
    const [driverID, setdriverID] = useState(1); // Assuming driverID is available upon login
    const [cars, setCars] = useState([]);
    const [newCar, setNewCar] = useState({
        brand: '',
        model: '',
        carYear: '',
        color: '',
        licensePlate: '',
        serialNumber: '',
        numberOfSeats: ''
    });
    const [showUpdateForm, setShowUpdateForm] = useState(false); // State to toggle update form
    const [selectedCar, setSelectedCar] = useState(null); // State to store selected car for update
    const [showAddForm, setShowAddForm] = useState(false); // State to toggle add form

    useEffect(() => {
        // Fetch cars and set driverID when component mounts
        fetchCars();
    }, []);

    const fetchCars = () => {
        // Fetch cars associated with the logged-in driver
        fetch(`http://localhost:8083/cars/driver/${driverID}`)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setCars(data.cars);
                } else {
                    setCars([]);
                }
            })
            .catch(error => console.error('Error fetching cars:', error));
    };

    const handleAddCar = (e) => {
        e.preventDefault();
        fetch('http://localhost:8083/cars/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...newCar,
                driverID: driverID // Include driverID when adding a new car
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    fetchCars(); // Refresh the car list after adding a new car
                    setNewCar({
                        brand: '',
                        model: '',
                        carYear: '',
                        color: '',
                        licensePlate: '',
                        serialNumber: '',
                        numberOfSeats: ''
                    });
                    setShowAddForm(false); // Hide add form after submission
                } else {
                    console.error('Error adding car:', data.message);
                }
            })
            .catch(error => console.error('Error adding car:', error));
    };

    const handleNewCarChange = (e) => {
        const { name, value } = e.target;
        setNewCar(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleDeleteCar = (carId) => {
        fetch(`http://localhost:8083/cars/delete/${carId}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    fetchCars(); // Refresh the car list after deleting a car
                } else {
                    console.error('Error deleting car:', data.message);
                }
            })
            .catch(error => console.error('Error deleting car:', error));
    };

    const handleUpdateCar = (car) => {
        setSelectedCar(car);
        setShowUpdateForm(true); // Show update form
    };

    const handleUpdateFormSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:8083/cars/update/${selectedCar.carID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(selectedCar) // Send selectedCar object containing driverID to backend
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    fetchCars(); // Refresh the car list after updating a car
                    setShowUpdateForm(false); // Close the update form
                } else {
                    console.error('Error updating car:', data.message);
                }
            })
            .catch(error => console.error('Error updating car:', error));
    };

    const handleUpdateCarChange = (e, field) => {
        const value = e.target.value;
        setSelectedCar(prevState => ({
            ...prevState,
            [field]: value
        }));
    };

    return (
        <div className="App">
            <h1>My Car</h1>
            <div className="add-car-form">
                {!showAddForm ? (
                    <button onClick={() => setShowAddForm(true)}>Add New Car</button>
                ) : (
                    <div>
                        <h2>Add New Car</h2>
                        <form onSubmit={handleAddCar}>
                            <input type="text" name="brand" placeholder="Brand" value={newCar.brand} onChange={handleNewCarChange} required />
                            <input type="text" name="model" placeholder="Model" value={newCar.model} onChange={handleNewCarChange} required />
                            <input type="text" name="carYear" placeholder="Car Year" value={newCar.carYear} onChange={handleNewCarChange} required />
                            <input type="text" name="color" placeholder="Color" value={newCar.color} onChange={handleNewCarChange} required />
                            <input type="text" name="licensePlate" placeholder="License Plate" value={newCar.licensePlate} onChange={handleNewCarChange} required />
                            <input type="text" name="serialNumber" placeholder="Serial Number" value={newCar.serialNumber} onChange={handleNewCarChange} required />
                            <input type="number" name="numberOfSeats" placeholder="Number of Seats" value={newCar.numberOfSeats} onChange={handleNewCarChange} required />
                            <button type="submit">Add Car</button>
                        </form>
                    </div>
                )}
            </div>
            <div className="car-list">
                <h2>My Cars</h2>
                <ul>
                    {cars.map(car => (
                        <li key={car.carID}>
                            <div>
                                <span>Brand: {car.brand}</span><br />
                                <span>Model: {car.model}</span><br />
                                <span>Year: {car.carYear}</span><br />
                                <span>Color: {car.color}</span><br />
                                <span>License Plate: {car.licensePlate}</span><br />
                                <span>Serial Number: {car.serialNumber}</span><br />
                                <span>Number of Seats: {car.numberOfSeats}</span>
                            </div>
                            <button className="delete-btn" onClick={() => handleDeleteCar(car.carID)}>Delete</button>
                            <button className="update-btn" onClick={() => handleUpdateCar(car)}>Update</button>
                            {selectedCar && selectedCar.carID === car.carID && (
                                <div>
                                    <h2>Update Car</h2>
                                    <form onSubmit={handleUpdateFormSubmit}>
                                        <input type="text" name="brand" placeholder="Brand" value={selectedCar.brand} onChange={(e) => handleUpdateCarChange(e, 'brand')} />
                                        <input type="text" name="model" placeholder="Model" value={selectedCar.model} onChange={(e) => handleUpdateCarChange(e, 'model')} />
                                        <input type="text" name="carYear" placeholder="Car Year" value={selectedCar.carYear} onChange={(e) => handleUpdateCarChange(e, 'carYear')} />
                                        <input type="text" name="color" placeholder="Color" value={selectedCar.color} onChange={(e) => handleUpdateCarChange(e, 'color')} />
                                        <input type="text" name="licensePlate" placeholder="License Plate" value={selectedCar.licensePlate} onChange={(e) => handleUpdateCarChange(e, 'licensePlate')} />
                                        <input type="text" name="serialNumber" placeholder="Serial Number" value={selectedCar.serialNumber} onChange={(e) => handleUpdateCarChange(e, 'serialNumber')} />
                                        <input type="number" name="numberOfSeats" placeholder="Number of Seats" value={selectedCar.numberOfSeats} onChange={(e) => handleUpdateCarChange(e, 'numberOfSeats')} />
                                        <button type="submit">Update Car</button>
                                    </form>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
    
    
}

export default Cars;
