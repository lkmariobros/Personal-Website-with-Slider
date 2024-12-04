import { memo } from 'react';
import type { NavItem } from '../lib/types';
import { ArrowUpRight } from 'lucide-react';

interface AccordionInfoPanelProps {
  section: NavItem;
}

const AccordionInfoPanel = memo(function AccordionInfoPanel({ section }: AccordionInfoPanelProps) {
  return (
    <div className="space-y-6 pt-4">
      <div className="flex items-start justify-between">
        <p className="text-white/80 leading-relaxed">
          {section.content}
        </p>
        <button className="p-2 hover:bg-white/10 rounded-lg transition-colors ml-4 flex-shrink-0">
          <ArrowUpRight className="w-5 h-5" />
        </button>
      </div>
      
      <div className="pt-4 border-t border-white/10">
        <h4 className="text-sm font-medium text-white/60 mb-3">Quick Actions</h4>
        <div className="grid grid-cols-2 gap-3">
          {section.name === "Contact" ? (
            <>
              <button className="p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                Send Email
              </button>
              <button className="p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                Schedule Call
              </button>
            </>
          ) : section.name === "Projects" ? (
            <>
              <button className="p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                View All
              </button>
              <button className="p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                Featured
              </button>
            </>
          ) : section.name === "Experience" ? (
            <>
              <button className="p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                Resume
              </button>
              <button className="p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                Skills
              </button>
            </>
          ) : (
            <>
              <button className="p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                More Info
              </button>
              <button className="p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                Bio
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
});

export default AccordionInfoPanel;