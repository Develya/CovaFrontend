# Cova Frontend

## To install
1. Clone this repository
2. run `npm install` in the root of the repository
3. run `npm start` to start up

## Important endpoints
```
<Routes>
        <Route exact path='/' element={<RegisterOrLogin/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/cars' element={<Cars/>}/>
        <Route path='/habitualtrajets/:userID' element={<Habitualtrajets/>}/>
        <Route path='/createTrajet/:userID' element={<CreateTrajet/>}/>
        <Route path='/updateTrajet/:trajetID' element={<UpdateTrajet />} />
        <Route path='/createJourney/:userID/:trajetID/:dayID' element={<CreateJourney/>}/>
        <Route path='/propositiontrajet/:departureAddress/:destinationAddress' element={<PropositionTrajet/>}/>
    </Routes>
```
