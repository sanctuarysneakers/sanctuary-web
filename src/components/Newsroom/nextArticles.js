import React from 'react'
import ArticleCard from './articleCard'
import { ArticleData } from './articleData'

export default function NextArticles() {

    const currentPage = window.location.pathname;

    const getArticles = () => {
        let numArticles = 0
        let recommended = []

        for (let article in ArticleData) {
            if (numArticles >= 3)   // Edit value to change # of articles to display next
                break
            if (currentPage !== ArticleData[article]['path']) {
                recommended.push(ArticleData[article])
                numArticles += 1
            }
        }
        return recommended
    }

    const articleCards = getArticles().map((article) => 
        <ArticleCard data={article} />
    )

    return (
        <div className='next-articles'>
            <div className='next-articles-content'>
                <h2> Latest Articles </h2>

                <div className='next-articles-cards'>
                    {articleCards}
                </div>
            </div>
        </div>
    )
}