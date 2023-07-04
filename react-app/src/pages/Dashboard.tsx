import { InfoBoxList } from '@app/components';
import { TweetList } from '@app/components';
import { ChartList } from '@app/components';
import { ContentHeader } from '@components';

const Dashboard = () => {
  return (
    <div>
      <ContentHeader title="Dashboard" />
      <section className="content">
        <div className="container-fluid">
          <InfoBoxList />
          <ChartList />
          <TweetList />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
