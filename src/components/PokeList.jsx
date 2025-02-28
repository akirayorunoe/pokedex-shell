import { useSuspenseInfiniteQuery } from "@tanstack/react-query"
import { fetchPokemonsQueryOptions } from "../queryOptions/fetchPokemonsQueryOptions"
import { useVirtualizer } from "@tanstack/react-virtual"
import { useEffect, useRef } from 'react'
import Card from "./Card"
import { fetchPokemon } from "../apis/pokemons"
import { getQueryFromURL } from "../helper"
import queryString from "query-string"
import { useInView } from 'react-intersection-observer'

const PokeList = () => {
    const { data, error, fetchNextPage, isFetchingNextPage, hasNextPage } = useSuspenseInfiniteQuery({
        ...fetchPokemonsQueryOptions(),
        queryFn: (ctx) => fetchPokemon({ limit: 10, offset: ctx.pageParam }),
        initialPageParam: 0,
        getNextPageParam: (lastPage) => {
            if (!lastPage.next) return;
            const queryParams = queryString.parse(getQueryFromURL(lastPage.next));
            const nextOffset = Number(queryParams?.offset); // Must be number
            return isNaN(nextOffset) ? undefined : nextOffset;
        }
    })
    const { ref, inView } = useInView()

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage()
        }
    }, [fetchNextPage, inView, hasNextPage])

    const pokemonsData = data?.pages.flatMap((page) => page.results) || [];

    const scrollRef = useRef(null)

    //useWindowVirtualizer for full screen(not container) & remove ref, getScrollElement
    const virtualizer = useVirtualizer({
        count: hasNextPage ? pokemonsData.length + 1 : pokemonsData.length,
        estimateSize: () => 90,
        getScrollElement: () => scrollRef.current
    })

    const virtualItems = virtualizer.getVirtualItems()

    if (error) return <div>Error</div>

    return (
        <div ref={scrollRef} className='w-[90dvw] h-[90dvh] overflow-auto'>
            <div className='relative' style={{ height: `${virtualizer.getTotalSize()}px` }}>
                <div className='absolute w-full top-0 left-0'
                    style={{
                        transform: `translateY(${virtualItems[0]?.start || 0}px)`,
                    }}
                >
                    {virtualItems.map(vItem => {
                        // Nếu index lớn hơn hoặc bằng số Pokémon, hiển thị Loading
                        if (vItem.index >= pokemonsData.length) {
                            return (
                                <div key={vItem.key} ref={ref} style={{
                                    fontSize: 20,
                                    textAlign: "center",
                                    padding: 20,
                                    color: "gray"
                                }}>
                                    {isFetchingNextPage && "Loading more..."}
                                </div>
                            );
                        }

                        const pokemon = pokemonsData[vItem.index];
                        return (
                            <div className='my-6' key={vItem.key}
                                data-index={vItem.index}
                                ref={virtualizer.measureElement}
                            >
                                <Card data={pokemon} />
                            </div>
                        );

                    })}
                    {!hasNextPage && !isFetchingNextPage && (
                        <div style={{
                            fontSize: 20,
                        }}>
                            No more Pokémon
                        </div>
                    )}
                </div>
            </div>
        </div>)
}

export default PokeList;

//dynamic size card
{/* <div ref={scrollRef} className='w-[90dvw] h-[90dvh] overflow-auto'>
<div className='relative' style={{ height: `${virtualizer.getTotalSize()}px` }}>
    <div className='absolute w-full top-0 left-0'
        style={{
            transform: `translateY(${virtualItems[0]?.start || 0}px)`,
        }}
    >
        {virtualItems.map(vItem => {
            const pokemon = pokemonsData[vItem.index]
            return <div className='my-6' key={vItem.key}
                data-index={vItem.index}            //
                ref={virtualizer.measureElement}    //use both for dynamic height
            >
                <Card data={pokemon} />
            </div>
        })}
    </div>
</div>
</div> */}

//Statuc size card
{/* <div ref={scrollRef} className='w-[90dvw] h-[90dvh] overflow-auto'>
            <div className='relative' style={{ height: `${virtualizer.getTotalSize()}px` }}>
                {virtualItems.map(vItem => {
                    const pokemon = pokemonsData[vItem.index]
                    return <div className='absolute w-full top-0 left-0'
                        style={{
                            transform: `translateY(${vItem.start}px)`,
                            height: `${vItem.size}px`
                        }} key={vItem.key}
                        data-index={vItem.index}
                    >
                        <div className='h-20 bg-[red]'>{pokemon.name}</div>
                    </div>
                })}
            </div>
        </div> */}