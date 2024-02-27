import { useDispatch, useSelector } from 'react-redux'

import styles from './Filters.module.scss'

function FiltersCheckbox({ value, text }) {
  const dispatch = useDispatch()
  const stopsFilters = useSelector((state) => state.tickets.filters.stops)

  const handleFilterChange = (filter) => {
    let newFilters

    if (filter === 'all') {
      newFilters = Object.keys(stopsFilters).reduce((acc, key) => {
        acc[key] = !stopsFilters[filter]
        return acc
      }, {})
    } else if (stopsFilters.all) {
      newFilters = {
        ...stopsFilters,
        all: false,
        [filter]: !stopsFilters[filter],
      }
    } else {
      newFilters = { ...stopsFilters, [filter]: !stopsFilters[filter] }
    }

    dispatch({
      type: 'TOGGLE_FILTER',
      payload: { category: 'stops', filters: newFilters },
    })
  }
  return (
    <label className={styles.label}>
      <input
        className={styles.input}
        type="checkbox"
        value={value}
        checked={stopsFilters[value]}
        onChange={() => handleFilterChange(value)}
      />
      <span className={styles.text}>{text}</span>
    </label>
  )
}

function Filters() {
  return (
    <div className={styles.filters}>
      <span className={styles.spanLabel}>КОЛИЧЕСТВО ПЕРЕСАДОК</span>
      <FiltersCheckbox value="all" text="Все" />
      <FiltersCheckbox value="nonStop" text="Без пересадок" />
      <FiltersCheckbox value="oneStop" text="1 Пересадка" />
      <FiltersCheckbox value="twoStops" text="2 Пересадки" />
      <FiltersCheckbox value="threeStops" text="3 Пересадки" />
    </div>
  )
}

export default Filters
