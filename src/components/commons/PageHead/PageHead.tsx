import Head from "next/head";

interface propTypes {
    title?: string;
}

const PageHead = (props: propTypes) => {
    const { title = 'Fortune Printing' } = props;
    return (
        <Head>
        <title>{title}</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/images/general/logoph.png" type="image/x-icon"/>
        </Head>
    );
};

export default PageHead;