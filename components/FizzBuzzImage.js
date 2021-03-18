
import styles from '../styles/Home.module.css'

export default function FizzBuzzImage(props) {
  const image = props.image 
  return <img className={styles.fizzbuzz} src={`data:image/jpeg;base64,${image}`} />
}
