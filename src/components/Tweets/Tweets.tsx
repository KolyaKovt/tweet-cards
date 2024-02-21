import { MouseEventHandler, useState } from "react"
import s from "./Tweets.module.css"

const Tweets = () => {
  const [isFollowing, setIsfollowing] = useState<boolean>(false)

  const handleChnageFollowState: MouseEventHandler<HTMLButtonElement> = () => {
    setIsfollowing(prev => !prev)
  }

  const btnText = isFollowing ? "Following" : "Follow"
  const buttonClass = isFollowing ? s.followingButton : s.followButton
  const followersText = (isFollowing ? "100,501" : "100,500") + " Followers"

  return (
    <div className={s.cardContainer}>
      <div className={s.card}>
        <img className={s.logo} src="/logo.png" alt="logo" />
        <img
          className={s.doneQuestion}
          src="/done-question.png"
          alt="question and done signs"
        />
        <img className={s.boyImg} src="/boy.png" alt="boy" />
        <span className={s.boyUnderline}></span>
        <p className={s.tweetText}>777 tweets</p>
        <p className={s.followerText}>{followersText}</p>
        <button
          className={buttonClass}
          type="button"
          onClick={handleChnageFollowState}
        >
          {btnText}
        </button>
      </div>
    </div>
  )
}

export default Tweets
