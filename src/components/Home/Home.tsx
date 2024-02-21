import { Link } from "react-router-dom"

const Home = () => {
  return (
    <section>
      <h1>Wanna see tweets?</h1>

      <Link to={"/tweets"}>See tweets</Link>
    </section>
  )
}

export default Home
