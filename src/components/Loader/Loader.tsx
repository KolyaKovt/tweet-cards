import { InfinitySpin } from "react-loader-spinner"
import s from "./Loader.module.css"

export const Loader = () => {
  return (
    <div className={s.loader_wrapper}>
      <InfinitySpin color="#76fe74" />
    </div>
  )
}
