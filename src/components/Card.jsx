import { useNavigate } from 'react-router-dom';

export default function Card({ data }) {
    const navigate = useNavigate();

    const getPokeId = (url) => url.split("/").filter(Boolean).pop();

    return <div className={`bg-[red]`} style={{ height: '50px' }} onClick={() => navigate(`/detail/${getPokeId(data?.url)}`)}>
        {data?.name}
    </div>
}