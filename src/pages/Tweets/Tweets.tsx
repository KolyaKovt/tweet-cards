import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import { Loader } from "../../components/Loader/Loader"

import { User } from "../../Types"
import { adjustUser, fetchUsers } from "../../services/services"
import { splitNumberWithComma } from "../../helpers/splitNumberWithComma"
import s from "./Tweets.module.scss"
import { useMediaQuery } from "react-responsive"

const limit = 2

const Tweets = () => {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState(1)

  useEffect(() => {
    setIsLoading(true)

    fetchUsers(limit, page)
      .then(res => {
        setUsers(prev => [...prev, ...res])
        setIsLoading(false)
      })
      .catch(() => setIsLoading(false))
  }, [page])

  const isMobile = useMediaQuery({
    query: `(max-device-width: 424px)`,
  })

  const handleChnageFollowState = (user: User) => {
    const { isFollowed, followers } = user

    setIsLoading(true)

    adjustUser({
      ...user,
      isFollowed: !isFollowed,
      followers: isFollowed ? followers - 1 : followers + 1,
    })
      .then(changedUser => {
        setUsers(prev => {
          let userInd = 0

          for (let i = 0; i < users.length; i++) {
            const user = prev[i]
            if (user.id === changedUser.id) {
              userInd = i
              break
            }
          }

          const newOne = [...prev]
          newOne[userInd] = changedUser

          return newOne
        })
        setIsLoading(false)
      })
      .catch(() => setIsLoading(false))
  }

  return (
    <main>
      <section className={s.container}>
        <h1 className="visually-hidden">tweets</h1>

        <Link className={s.back} to="/">
          {isMobile ? "⬅" : "back"}
        </Link>

        {isLoading && <Loader />}

        <ul className={s.cardsList}>
          {users.map(user => {
            const { isFollowed, id, tweets, followers, avatar, name } = user

            const btnText = isFollowed ? "Following" : "Follow"
            const buttonClass = isFollowed ? s.followingButton : s.followButton
            const followersQuantity = splitNumberWithComma(followers)
            const avatarRes = avatar ? avatar : "/default-avatar.png"

            return (
              <li className={s.card} key={id}>
                <div className={s.avatarContainer}>
                  <img className={s.avatar} src={avatarRes} alt={name} />
                </div>
                <p className={s.tweetText}>{tweets} tweets</p>
                <p className={s.followerText}>{followersQuantity} Followers</p>
                <button
                  className={buttonClass}
                  type="button"
                  onClick={() => handleChnageFollowState(user)}
                >
                  {btnText}
                </button>
              </li>
            )
          })}
        </ul>
        
        <button className={s.more} onClick={() => setPage(prev => prev + 1)}>
          Load more...
        </button>
      </section>
    </main>
  )
}

export default Tweets
