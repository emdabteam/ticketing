// import buildClient from "../api/build-client";
import Link from "next/dist/client/link";

const LandingPage = ({ currentUser, tickets }) => {
  // console.log(tickets);
  // console.log('I am in the component ', currentUser);
  // axios.get('/api/users/currentuser');

  // return <h1>Landing page</h1>
  // return currentUser ? <h1>You are signed in</h1> : <h1>You are not signed in</h1>
  const ticketList = tickets.map(ticket => {
    return (
      <tr key={ticket.id}>
        <td>{ticket.title}</td>
        <td>{ticket.price}</td>
        <td>
          <Link href="/tickets/[ticketId]" as={`/tickets/${ticket.id}`}>
            <a>View</a>
          </Link>          
        </td>
      </tr>
    );
  });

  return (
    <div>
      <h1>Tickets</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {ticketList}
        </tbody>
      </table>
    </div>
  );
};

LandingPage.getInitialProps = async (context, client, currentUser) => {
  // console.log('LANDING PAGE!');
  // // const { data } = await buildClient(context).get('/api/users/currentuser');
  // const client = buildClient(context);
  // const { data } = await client.get('/api/users/currentuser');

  // return data;
  // return {};
  const { data } = await client.get('/api/tickets');

  return { tickets: data };
};

export default LandingPage;