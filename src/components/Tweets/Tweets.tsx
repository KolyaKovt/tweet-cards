import { useEffect, useState } from "react"
import s from "./Tweets.module.css"
import { User } from "../../Types"
import { adjustUser, fetchUsers } from "../../services/services"
import { splitNumberWithComma } from "../../helpers/splitNumberWithComma"

const Tweets = () => {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    fetchUsers().then(res => setUsers(res))
  }, [])

  const handleChnageFollowState = (user: User) => {
    const { isFollowed, followers } = user

    adjustUser({
      ...user,
      isFollowed: !isFollowed,
      followers: isFollowed ? followers - 1 : followers + 1,
    }).then(changedUser => {
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
    })
  }

  return (
    <ul className={s.cardsList}>
      {users.map(user => {
        const { isFollowed, id, tweets, followers } = user

        const btnText = isFollowed ? "Following" : "Follow"
        const buttonClass = isFollowed ? s.followingButton : s.followButton
        const followersQuantity = splitNumberWithComma(followers)

        return (
          <li className={s.card} key={id}>
            <img className={s.logo} src="/logo.png" alt="logo" />
            <img
              className={s.doneQuestion}
              src="/done-question.png"
              alt="question and done signs"
            />
            <img className={s.boyImg} src="/boy.png" alt="boy" />
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
  )
}

export default Tweets
