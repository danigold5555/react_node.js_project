
import Spinner from 'react-bootstrap/Spinner'
import './SpinnerForVacations.css'


function SpinnerForVacations () {
      return (
    <div className="Spinner">
    <Spinner animation="grow" />
    <h5 className='wait-header-style'>Please Wait...</h5>
    </div>
        )
  }



export default SpinnerForVacations