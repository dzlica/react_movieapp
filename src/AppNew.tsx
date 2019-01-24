import * as React from 'react'
import './App.css';

interface movieState {

}

export class App extends React.Component<movieState> {

    state = {};

    render() {
        const characters = [
            {
                'name': 'Lica',
                'movie': 'The Godfather'
            },
            {
                'name': 'Mirko',
                'movie': 'Cars'
            }
        ];
        return (
            <>
                <Header/>

                <div className="container">
                    <Table characterData={characters}/>
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


class Table extends React.Component<TableProps> {
    render() {
        const characterData = this.props.characterData;

        return (
            <table>
                <TableHeader/>
                <TableBody characterData={characterData}/>
            </table>
        );
    }
}

interface TableProps {
    characterData: Array<Person>
}

interface Person {
    name: string
    movie: string
}

const TableBody: React.FunctionComponent<TableProps> = ({characterData}) => {
    const rows = characterData.map((row, index) => {
        return (
            <tr key={index}>
                <td>{row.name}</td>
                <td>{row.movie}</td>
            </tr>
        );
    });

    return <tbody>{rows}</tbody>;
};

const TableHeader = () => {
    return (
        <thead>
        <tr>
            <th>Name</th>
            <th>Movie</th>
        </tr>
        </thead>
    );
};


export default App;

