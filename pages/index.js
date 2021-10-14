import Head from 'next/head';

import MeetupList from '../components/meetups/MeetupList';

import { MongoClient } from 'mongodb';
import { Fragment } from 'react';

function HomePage(props) {
    // const [loadedMeetups, setLoadedMeetups] = useState([]);
    // useEffect(() => {
    //     setLoadedMeetups(DUMMY_MEETUPS);
    // },[]);

    return (
        <Fragment>
            <Head>
                <title>React Meetups</title>
                <meta 
                    name='description'
                    content='Browse a list of React meetups!'
                />
            </Head>
            <MeetupList meetups={props.meetups}/>
        </Fragment>
    )
}


// export async function getServerSideProps(context) {
//     //fetch data from an api
//     const req = context.req;
//     const res = context.res;

//     return {
//         props: {
//             meetups: DUMMY_MEETUPS
//         }
//     };
// }

export async function getStaticProps(props) {
    // fetch data from an api

    const client = await MongoClient.connect('mongodb+srv://nextjs:Nexaple92!@cluster0.mbvol.mongodb.net/meetups?retryWrites=true&w=majority');
        const db = client.db();

        const meetupsCollection = db.collection('meetups');

        const meetups = await meetupsCollection.find().toArray();

        client.close();

    return {
        props: {
            meetups: meetups.map(meetup => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString()
            }))
        },
        revalidate: 1
    };
}

export default HomePage;