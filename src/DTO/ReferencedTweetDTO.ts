type ReferencedTweetDTO = {
    id: string,
    type: 'retweeted' | 'quoted' | 'replied_to'
};

export default ReferencedTweetDTO;
