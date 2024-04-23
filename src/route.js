import {Routes, Route} from 'react-router-dom'

import { CreateTrajet, UpdateTrajet } from './trajetDAO'
import Habitualtrajets from './trajet'

const Routecomponent = () => (
    <Routes>
        <Route exact path='/' element={<Habitualtrajets/>}/>
        <Route path='/createTrajet' element={<CreateTrajet/>}/>
        <Route path='/updateTrajet/:trajetID' element={<UpdateTrajet />} />
    </Routes>
)

export default Routecomponent