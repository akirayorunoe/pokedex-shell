import { useState } from "react"

export default function Card({ data }) {

    const [click, setClick] = useState(false)

    return <div className={`bg-[red]`} style={{ height: click ? '100px' : '50px' }} onClick={() => setClick(!click)}>
        {data?.name}
    </div>
}