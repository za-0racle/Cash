import { Landmark } from "lucide-react";
import { Link } from "react-router-dom";
import { bankProviders } from "../store";

export default function ActivityChart() {
  return (
    <section className="panel activity-panel">
      <div className="section-heading">
        <h2>Balance activity</h2>
      </div>
      <div className="empty-state">
        <Landmark />
        <h3>Connect a bank to view activity</h3>
        <p>
          {bankProviders.join(" and ")} connection setup is required to load
          balances and transaction history.
        </p>
        <Link className="text-link" to="/dashboard/accounts">
          View bank options
        </Link>
      </div>
    </section>
  );
}
