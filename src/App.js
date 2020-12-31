import './App.css';
import Card from "./components/Card";
import React, {useEffect, useState} from "react";

const url = "https://course-api.com/react-tours-project"

function App() {

    const [tours, setTours] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)

    useEffect(() => {
        fetchTours()
    }, [])

    const fetchTours = () => {
            fetch(url)
                .then((response) => {
                    return response.json()
                })
                .then((r) => {
                    setIsError(false);
                    setTours(r)
                })
                .catch((err) => {
                    setIsError(true)
                    console.error(err);
                })
                .finally(() => {
                    setIsLoading(false)
                })

        },
        removeTour = (id) => {
            let newToursData = tours.filter( (tour) => tour.id !== id)
            setTours(newToursData)
        };

    if (isError) {
        return (
            <>
                <main>
                    <section className="title">
                        <h1>Error trying to fetch the API</h1>
                        <div className="underline"></div>
                        <button className='btn-primary' onClick={ () => fetchTours() }>Try Again</button>
                    </section>
                </main>
            </>
        )
    }

    if (isLoading) {
        return (
            <>
                <main>
                    <section className="title">
                        <h1>Fetching API</h1>
                        <div className="underline"></div>
                    </section>
                </main>
            </>
        )
    }

    if (tours.length === 0) {
        return (
            <>
                <main>
                    <section className="title">
                        <h1>List is empty</h1>
                        <div className="underline"></div>
                        <button className='btn-primary' onClick={ () => fetchTours() }>Get more</button>
                    </section>
                </main>
            </>
        )
    }

    return (
        <>
            <main>
                <section className="title">
                    <h1>Our Tours</h1>
                    <div className="underline"></div>
                </section>
                <section className="cards">

                    {tours.map((tour) => {
                        return (
                            <Card key={tour.id}>
                                <img src={tour.image ?? ''} alt={tour.name ?? ''}/>
                                <div className="heading">
                                    <h2>{tour.name}</h2>
                                    <span>${tour.price}</span>
                                </div>
                                <p>
                                    {tour.info}
                                </p>
                                <button type="button" onClick={() => removeTour(tour.id)}>Not interested</button>
                            </Card>
                        )
                    })}

                </section>
            </main>
        </>
    );
}

export default App;
