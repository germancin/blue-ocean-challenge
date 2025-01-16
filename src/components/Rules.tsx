import { Trophy, Target, BarChart3 } from 'lucide-react';

const Rules = () => {
  return (
    <section className="relative py-16 overflow-hidden bg-navy">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
        style={{ 
          backgroundImage: 'url("/lovable-uploads/7cec8cef-9c5b-423c-9299-4f44b4430fb1.png")'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-navy/90 via-navy/85 to-[#001F3F]/80" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <div className="relative inline-block">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-gradient-xy"></div>
            <h2 className="relative text-6xl font-bold text-white font-display mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-100">
              Trading Challenge Rules
            </h2>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <div className="w-12 h-1 bg-bright-blue rounded-full"></div>
            <div className="w-24 h-1 bg-gradient-to-r from-bright-blue to-purple-500 rounded-full"></div>
            <div className="w-12 h-1 bg-purple-500 rounded-full"></div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative pl-8 mb-16 group">
            <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-[#00ff94] to-[#00c8ff] rounded-full" />
            <div className="absolute left-[-12px] top-0 w-6 h-6 bg-[#00ff94] rounded-full" />
            
            <div className="bg-black/20 backdrop-blur-xl p-8 rounded-lg border border-[#00ff94]/20 group-hover:border-[#00ff94]/40 transition-all duration-300">
              <Trophy className="w-12 h-12 text-[#00ff94] mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">General Conditions</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h4 className="text-[#00ff94] font-semibold">Demo Account Setup</h4>
                  <p className="text-gray-300">Start with a demo account to practice and prove your trading skills without risking real capital.</p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-[#00ff94] font-semibold">Challenge Duration</h4>
                  <p className="text-gray-300">Complete the challenge within 30 days to demonstrate consistent performance and strategy execution.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative pl-8 mb-16 group">
            <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-[#00c8ff] to-[#ff4d4d] rounded-full" />
            <div className="absolute left-[-12px] top-0 w-6 h-6 bg-[#00c8ff] rounded-full" />
            
            <div className="bg-black/20 backdrop-blur-xl p-8 rounded-lg border border-[#00c8ff]/20 group-hover:border-[#00c8ff]/40 transition-all duration-300">
              <Target className="w-12 h-12 text-[#00c8ff] mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">Risk Management Rules</h3>
              <div className="space-y-2">
                <h4 className="text-[#00c8ff] font-semibold">Maximum Drawdown Limits</h4>
                <p className="text-gray-300">Maintain strict adherence to maximum drawdown limits of 10% to ensure responsible risk management and capital preservation.</p>
              </div>
            </div>
          </div>

          <div className="relative pl-8 group">
            <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-[#ff4d4d] to-[#00ff94] rounded-full" />
            <div className="absolute left-[-12px] top-0 w-6 h-6 bg-[#ff4d4d] rounded-full" />
            
            <div className="bg-black/20 backdrop-blur-xl p-8 rounded-lg border border-[#ff4d4d]/20 group-hover:border-[#ff4d4d]/40 transition-all duration-300">
              <BarChart3 className="w-12 h-12 text-[#ff4d4d] mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">Evaluation Criteria</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-[#ff4d4d] font-semibold">Final Balance Requirements</h4>
                    <p className="text-gray-300">Achieve a minimum profit target while maintaining consistent trading performance throughout the challenge period.</p>
                  </div>
                  <div>
                    <h4 className="text-[#ff4d4d] font-semibold">Trading Rules Compliance</h4>
                    <p className="text-gray-300">Follow all trading rules and guidelines consistently throughout the challenge duration.</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-[#ff4d4d] font-semibold">Performance Metrics</h4>
                    <p className="text-gray-300">Meet key performance indicators including win rate, risk-reward ratio, and consistent profit generation.</p>
                  </div>
                  <div>
                    <h4 className="text-[#ff4d4d] font-semibold">Qualification Standards</h4>
                    <p className="text-gray-300">Successfully complete all challenge requirements to qualify for funded trader status.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Rules;