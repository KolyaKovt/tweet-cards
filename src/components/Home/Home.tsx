import { Link } from "react-router-dom"
import s from "./Home.module.scss"
import tweetS from "../Tweets/Tweets.module.scss"

const Home = () => {
  return (
    <section className={s.container}>
      <h1 className={s.title}>Wanna see tweets?</h1>

      <Link className={tweetS.followButton} to={"/tweets"}>
        See tweets
      </Link>
    </section>
  )
}

export default Home
