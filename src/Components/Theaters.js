import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import TheaterThumb from './TheaterThumb'
import { getTheaters } from '../dux/theaterReducer'

const Theaters = (props) => {
  // const [theaters, setTheaters] = useState([])

  useEffect(() => {
    props.getTheaters()
  }, [])

  // const getTheaters = () => {
  //   axios.get('/api/theaters')
  //     .then(res => setTheaters(res.data))
  //     .catch(err => alert(err))
  // }

  return (
    <div>
      {props.theaters.theaters.map((theater) => {
        return (
          <TheaterThumb
            key={theater.theater_id}
            theater={theater}
            getTheaters={getTheaters}
            generalTheaters={true} />
        )
      })}
    </div>
  )
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps, { getTheaters })(Theaters)