import * as React from 'react'
import './App.css';

interface FavMovieState {
    onButtonClick?: React.FormEventHandler<HTMLFormElement>
    title: string
    changeEvent?: React.ChangeEventHandler<HTMLInputElement>
    favMovies: Array<string>
    isLoaded: boolean
    movieTitle: string
    items: Array<string>
}


export class App extends React.Component<{}, FavMovieState> {

    constructor(props: {}) {
        super(props);
        this.state = {
            title: "",
            favMovies: [],
            isLoaded: false,
            movieTitle: '',
            items: []
        };
    }

    handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        this.setState({
            title: "",
            favMovies: [
                ...this.state.favMovies,
                this.state.title
            ]
        })
    };

    renderMovies(): JSX.Element[] {
        return this.state.favMovies.map((movie: string, index: number) => {
                return (
                    <div key={index}>
                        {movie}
                    </div>
                )
            }
        )
    }

    componentDidMount() {
        fetch('http://www.omdbapi.com/?t=the+godfather&apikey=49399b24')
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        movieTitle: result.Title
                    });
                }
            )
    }

    handleOmdb(event: React.ChangeEvent<HTMLButtonElement>) {
        event.preventDefault();
        this.setState({
            movieTitle: '',
            items: [
                ...this.state.items,
                this.state.movieTitle
            ]
        })
    }

    displayMovie(): JSX.Element[] {
        return this.state.items.map((item: string, index: number) => {
            return (
                <div key={index}>
                    {item}
                </div>
            )
            }

        )
    }

    render() {

        return (
            <>
                <Header/>
                <FavMovie
                    onButtonClick={(e) => this.handleSubmit(e)}
                    title={this.state.title}
                    changeEvent={(e) => this.setState( {title: e.target.value})}>
                </FavMovie>
                <section>
                    {this.renderMovies()}
                </section>
                <div>
                    <button type='submit' value={this.state.movieTitle} onChange={this.handleOmdb}>Show me the movie</button>
                    <section>
                        {this.displayMovie()}
                        {this.state.movieTitle}
                    </section>
                </div>
            </>
        );
    }
}


const Header: React.FunctionComponent = () => (
    <div className={'siteTop'}>
        <h1>LMDB: Lica's Movie Database</h1>
    </div>
);

interface FavMovieProps {
    onButtonClick: React.FormEventHandler<HTMLFormElement>
    title: string
    changeEvent: React.ChangeEventHandler<HTMLInputElement>
}


const FavMovie: React.FunctionComponent<FavMovieProps> = ({onButtonClick, title, changeEvent}) => (
    <div>
        <form onSubmit={onButtonClick}>
            <input
                type="text"
                placeholder='Your fav movie'
                value={title}
                onChange={changeEvent}
            />
            <button type="submit">Fav movie</button>
        </form>
    </div>
);

export default App;
