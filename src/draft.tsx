import * as React from 'react'
import './App.css';

interface FavMovieState {
    title: string;
    favMovies: Array<string>;
}


export class App extends React.Component<{}, FavMovieState> {

    constructor(props: {}) {
        super(props);
        this.state = {
            title: "",
            favMovies: []
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

    render() {
        // const {title} = this.state;


        return (
            <>
                <Header/>
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    <input
                        type="text"
                        placeholder='Your fav movie'
                        value={this.state.title}
                        onChange={(e) => this.setState( {title: e.target.value})}/>
                    <button type="submit">Fav movie</button>
                </form>
                <section>
                    {this.renderMovies()}
                </section>
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
    onButtonClick: React.MouseEventHandler<HTMLButtonElement>
}


const FavMovie: React.FunctionComponent<FavMovieProps> = ({onButtonClick}) => (
    <div>
        <button onClick={onButtonClick}>Fav movie</button>
    </div>
);

export default App;

