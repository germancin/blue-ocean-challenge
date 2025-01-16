import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Terms = () => {
  return (
    <main className="min-h-screen bg-navy">
      <Navbar />
      <div className="container mx-auto px-4 py-24 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-white">Terms and Conditions</h1>
        
        <div className="space-y-6 text-light-gray">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-bright-blue">1. Contest Overview</h2>
            <p>This trading contest is organized to test and showcase trading skills in a competitive environment. Participants must be of legal age in their jurisdiction to participate.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-bright-blue">2. Eligibility</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Participants must be at least 18 years old</li>
              <li>Must have a valid email address</li>
              <li>Must complete the registration process and pay the entry fee</li>
              <li>Must comply with all local laws and regulations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-bright-blue">3. Contest Rules</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Trading must be conducted within the specified contest period</li>
              <li>Only designated trading pairs are allowed</li>
              <li>Use of automated trading systems or bots is prohibited</li>
              <li>Market manipulation tactics are strictly forbidden</li>
              <li>Participants must use their own trading account</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-bright-blue">4. Prize Distribution</h2>
            <p>Prizes will be distributed according to the final rankings. The organizer reserves the right to verify all trading activities before distributing prizes.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-bright-blue">5. Disqualification</h2>
            <p>The organizer reserves the right to disqualify any participant who:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Violates the contest rules</li>
              <li>Provides false information</li>
              <li>Engages in unfair trading practices</li>
              <li>Attempts to manipulate the contest results</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-bright-blue">6. Liability</h2>
            <p>Participants acknowledge that trading involves risk and the organizer is not responsible for any losses incurred during the contest.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-bright-blue">7. Changes to Terms</h2>
            <p>The organizer reserves the right to modify these terms and conditions at any time. Participants will be notified of any changes.</p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Terms;