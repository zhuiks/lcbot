import React from 'react';
import Highlighter from "react-highlight-words";

const wordSearch = (songs: any[], term: string) => {
    if (term.trim().length === 0)
        return songs;
    const regex = RegExp(term, "gi");
    const result: any[] = songs.map(song => {
        const score = regex.test(song.title) ? 10 : 0;
        const title = <Highlighter
            highlightClassName="bg-info text-white"
            searchWords={[term]}
            textToHighlight={song.title}
        />
        return {
            ...song,
            score,
            title,
        }
    });

    return result.filter(song => song.score>0);
}

export default wordSearch;