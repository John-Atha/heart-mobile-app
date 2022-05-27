import React from 'react'
import Carousel from 'react-native-carousel-control'
import { Headline, Subheading } from 'react-native-paper'
import { Dimensions } from 'react-native-web'
import { View } from 'react-native'
import { useQuery } from 'react-query'
import { queriesKeys } from '../../api/queriesKeys'
import { getQuotes } from '../../api/quotes'
import { Spinner } from '../Global/Spinner'
import { OneQuote } from './OneQuote'

export const Quotes = () => {
    const { data, isLoading } = useQuery(
        queriesKeys['getQuotes'],
        getQuotes        
    );

    if (isLoading) {
        return <Spinner />
    }

    if (!data) {
        return null;
    }

    return (
        <View style={{ paddingVertical: 5 }}>
            <Headline style={{ textAlign: "center", marginBottom: 5 }}>
                Tips
            </Headline>
            <Carousel pageWidth={Dimensions.get("window").width-20} sneak={40}>
                {data.map(({ text, id }) => <OneQuote key={id} text={text} />)}
            </Carousel>
        </View>
    )
}