import { useEffect, useState } from "react"
import s from "./Tweets.module.scss"
import { User } from "../../Types"
import { adjustUser, fetchUsers } from "../../services/services"
import { splitNumberWithComma } from "../../helpers/splitNumberWithComma"
import { Link } from "react-router-dom"
import { Loader } from "../Loader/Loader"

const Tweets = () => {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)

    fetchUsers()
      .then(res => {
        setUsers(res)
        setIsLoading(false)
      })
      .catch(() => setIsLoading(false))
  }, [])

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
    <div className={s.container}>
      <Link className={s.back} to="/">
        Back
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
              <img className={s.logo} src="/logo.png" alt="logo" />
              <img
                className={s.doneQuestion}
                src="/done-question.png"
                alt="question and done signs"
              />
              <img className={s.avatar} src={avatarRes} alt={name} />
              <img
                className={s.avatarBorder}
                src="/ellipse.png"
                alt="avatar's border"
              />
              <span className={s.boyUnderline}></span>
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
    </div>
  )
}

export default Tweets
