import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { getSearchId, getTickets } from '../../services/api'
import TicketList from '../TicketList/TicketList'
import Filters from '../Filters/Filters'
import logo from '../../assets/Logo.svg'
import SortButtons from '../SortButton'

import styles from './App.module.scss'

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const searchId = await getSearchId()
        const { tickets, stop } = await getTickets(searchId)

        if (!stop) {
          dispatch({ type: 'FETCH_TICKETS_SUCCESS', payload: tickets })
        }
      } catch (error) {
        dispatch({ type: 'FETCH_TICKETS_FAILURE', payload: error.message })
      }
    }

    fetchData()
  }, [dispatch])

  return (
    <div id="Avisales" className={styles.body_app}>
      <div className={styles.logo}>
        <img src={logo} alt="Logo" className={styles.logo__plane} />
      </div>
      <div className={styles.app}>
        <Filters />
        <div className={styles.menu}>
          <SortButtons />
          <TicketList />
        </div>
      </div>
    </div>
  )
}

export default App
