import { CardGif } from "../ui/CardGif/CardGif";
import { useAppSelector } from "../../hooks/redux";



export const GifList = () => {
    const gif=useAppSelector(state => state.gif.gif);
  return (
    <div style={{display:"grid", gridTemplateColumns:"repeat(3, 0.6fr)",
        gap:"2vh",
    }}>
        {
            gif.map((el, i) => (
                <CardGif gif={el} key={i}/>
            ))
        }
    </div>
  )
}
