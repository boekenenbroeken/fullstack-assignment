import { useParams } from 'react-router-dom';

export function RacesWinners() {
  const { season } = useParams();

  if (!season) {
    return <div>Invalid season</div>;
  }

  return (
    <div>
      <h1>Races for season {season}</h1>
      {/* Your logic here */}
    </div>
  );
}
