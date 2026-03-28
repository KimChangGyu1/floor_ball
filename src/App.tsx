/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Home, Trophy, Shield, Target, Move } from 'lucide-react';

type Screen = 'home' | 'hit' | 'defense' | 'dribble' | 'challenge';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');

  const showScreen = (screen: Screen) => {
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-linear-to-br from-blue to-sky text-white py-6 px-4 shadow-lg sticky top-0 z-50">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="title-wrap">
            <h1 className="m-0 text-3xl font-extrabold tracking-tight">플로어 볼을 즐겨요</h1>
            <p className="mt-1.5 text-sm opacity-90">활동을 선택하면 영상, PPT, 설명 자료가 있는 학습 화면으로 이동합니다.</p>
          </div>
          <button 
            onClick={() => showScreen('home')}
            className="bg-white/20 hover:bg-white/30 text-white px-4 py-2.5 rounded-xl text-sm font-bold cursor-pointer backdrop-blur-sm transition-colors flex items-center gap-2 self-start md:self-auto"
          >
            <Home size={18} /> 홈으로
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-5xl w-full mx-auto p-7 md:px-4">
        <AnimatePresence mode="wait">
          {currentScreen === 'home' && (
            <motion.section
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-xl p-5 border border-[#edf3ff] shadow-custom">
                <strong className="text-navy">플로어 볼 학습용 웹앱</strong>입니다.
                타격, 수비, 드리블, 챌린지 활동을 선택하여 관련 영상과 발표 자료를 볼 수 있습니다.
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <MenuCard 
                  title="타격 활동" 
                  description="움직여 오는 공을 보고 정확한 타이밍에 타격하는 활동입니다."
                  onClick={() => showScreen('hit')}
                  icon={<HitIllustration />}
                />
                <MenuCard 
                  title="수비 활동" 
                  description="움직이는 방해 요소를 피해 골을 성공시키는 활동입니다."
                  onClick={() => showScreen('defense')}
                  icon={<DefenseIllustration />}
                />
                <MenuCard 
                  title="드리블 활동" 
                  description="공을 가까이 조절하며 코스를 따라 이동하는 활동입니다."
                  onClick={() => showScreen('dribble')}
                  icon={<DribbleIllustration />}
                />
                <MenuCard 
                  title="챌린지 활동" 
                  description="게임형 미션에 도전하며 기능을 종합적으로 활용합니다."
                  onClick={() => showScreen('challenge')}
                  icon={<ChallengeIllustration />}
                />
              </div>
            </motion.section>
          )}

          {currentScreen === 'hit' && (
            <DetailScreen 
              key="hit"
              icon="🏑"
              title="타격 활동"
              subtitle="공의 방향을 보고 빠르게 반응하며 정확하게 타격하는 활동"
              description="다양한 방향에서 움직여 오는 공을 보고 스틱으로 타격하는 활동입니다. 타이밍, 방향 조절, 집중력을 함께 기를 수 있습니다."
              points={[
                "공의 이동 방향을 끝까지 바라보도록 지도합니다.",
                "스틱의 면과 타격 방향의 관계를 익히게 합니다.",
                "안전거리를 확보한 상태에서 차례로 활동하게 합니다."
              ]}
              onBack={() => showScreen('home')}
            />
          )}

          {currentScreen === 'defense' && (
            <DetailScreen 
              key="defense"
              icon="🥅"
              title="수비 활동"
              subtitle="방해 요소를 피해 목표 지점으로 정확히 보내는 활동"
              description="움직이는 골키퍼나 장애물을 피해 공을 원하는 위치로 보내는 활동입니다. 판단력과 조절력을 바탕으로 게임의 재미를 경험할 수 있습니다."
              points={[
                "공을 세게만 치기보다 방향을 조절하도록 지도합니다.",
                "장애물의 움직임을 관찰한 뒤 시도하게 합니다.",
                "성공 경험을 느낄 수 있도록 난이도를 조절합니다."
              ]}
              onBack={() => showScreen('home')}
            />
          )}

          {currentScreen === 'dribble' && (
            <DetailScreen 
              key="dribble"
              icon="⚪"
              title="드리블 활동"
              subtitle="공을 가까이 조절하며 안정적으로 이동하는 활동"
              description="공을 스틱 가까이 두고 경로를 따라 이동하는 활동입니다. 스틱 조작 능력, 거리 감각, 이동 조절 능력을 자연스럽게 익힐 수 있습니다."
              points={[
                "공을 너무 멀리 보내지 않도록 조절하게 합니다.",
                "지그재그, 원형, 직선 코스로 난이도를 조절할 수 있습니다.",
                "시선은 앞을 보고 공은 가까이 두는 습관을 형성합니다."
              ]}
              onBack={() => showScreen('home')}
            />
          )}

          {currentScreen === 'challenge' && (
            <DetailScreen 
              key="challenge"
              icon="🏆"
              title="챌린지 활동"
              subtitle="타격, 수비, 드리블 요소를 결합한 게임형 종합 활동"
              description="여러 기능 요소를 결합한 도전 활동입니다. 학생들이 흥미롭게 참여하며 배운 기능을 실제 게임처럼 활용할 수 있도록 돕습니다."
              points={[
                "도전 요소를 통해 학생들의 몰입도를 높입니다.",
                "개인전, 모둠전 등 다양한 방식으로 운영할 수 있습니다.",
                "성공 기준을 분명히 제시해 참여 의욕을 높입니다."
              ]}
              onBack={() => showScreen('home')}
            />
          )}
        </AnimatePresence>
      </main>

      <footer className="text-center py-6 px-4 text-[#667991] text-sm">
        플로어 볼 학습용 웹앱 · <span className="font-bold text-[#315b89]">제작자: 김창규 송기환 민경훈</span><br />
        <span className="text-xs opacity-70">※ 교육자료전.</span>
      </footer>
    </div>
  );
}

function MenuCard({ title, description, onClick, icon }: { title: string, description: string, onClick: () => void, icon: React.ReactNode }) {
  return (
    <div className="menu-card" onClick={onClick}>
      <div className="card-illustration">
        {icon}
      </div>
      <h2 className="m-0 text-xl text-[#144a86] text-center font-bold">{title}</h2>
      <p className="mt-2.5 text-sm text-[#4b6584] leading-relaxed text-center">{description}</p>
    </div>
  );
}

function DetailScreen({ icon, title, subtitle, description, points, onBack }: { 
  icon: string, 
  title: string, 
  subtitle: string, 
  description: string, 
  points: string[], 
  onBack: () => void 
}) {
  return (
    <motion.section
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="detail-box"
    >
      <div className="flex items-center gap-3.5 mb-3">
        <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-[#eaf5ff] to-[#d7efff] flex items-center justify-center shrink-0 text-3xl">
          {icon}
        </div>
        <div className="detail-title">
          <h2 className="m-0 text-navy text-2xl font-bold">{title}</h2>
          <p className="mt-1.5 text-[#56708e] text-sm">{subtitle}</p>
        </div>
      </div>

      <div className="mt-5.5">
        <div className="text-[1.08rem] font-extrabold text-[#245b97] mb-2.5">활동 설명</div>
        <div className="section-card">
          <p className="leading-relaxed text-[#35516d] text-[0.98rem]">{description}</p>
        </div>
      </div>

      <div className="mt-5.5">
        <div className="text-[1.08rem] font-extrabold text-[#245b97] mb-2.5">영상 자료</div>
        <div className="video-placeholder">
          여기에 유튜브 영상 또는 활동 시연 영상을 삽입하세요.<br />
          나중에 iframe 코드로 교체하면 됩니다.
        </div>
      </div>

      <div className="mt-5.5">
        <div className="text-[1.08rem] font-extrabold text-[#245b97] mb-2.5">PPT / 학습자료</div>
        <div className="section-card">
          <div className="flex flex-wrap gap-3">
            <button className="material-btn">PPT 보기</button>
            <button className="material-btn">활동 설명서</button>
            <button className="material-btn">사진 자료</button>
          </div>
        </div>
      </div>

      <div className="mt-5.5">
        <div className="text-[1.08rem] font-extrabold text-[#245b97] mb-2.5">지도 포인트</div>
        <div className="section-card">
          <ul className="m-0 pl-5 list-disc space-y-1">
            {points.map((point, i) => (
              <li key={i} className="leading-relaxed text-[#35516d] text-[0.98rem]">{point}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6.5 flex gap-3 flex-wrap">
        <button className="back-btn" onClick={onBack}>처음 화면으로</button>
      </div>
    </motion.section>
  );
}

function HitIllustration() {
  return (
    <svg viewBox="0 0 260 180" xmlns="http://www.w3.org/2000/svg">
      <rect x="15" y="15" width="230" height="150" rx="18" fill="#dff1ff"/>
      <circle cx="185" cy="110" r="14" fill="#ffffff" stroke="#4a90e2" strokeWidth="4"/>
      <line x1="60" y1="130" x2="135" y2="78" stroke="#8b5e3c" strokeWidth="10" strokeLinecap="round"/>
      <rect x="130" y="66" width="58" height="18" rx="8" fill="#f5a623"/>
      <line x1="194" y1="110" x2="225" y2="98" stroke="#4a90e2" strokeWidth="4" strokeLinecap="round"/>
      <text x="28" y="42" fontSize="18" fill="#245b97" fontWeight="700">타격</text>
    </svg>
  );
}

function DefenseIllustration() {
  return (
    <svg viewBox="0 0 260 180" xmlns="http://www.w3.org/2000/svg">
      <rect x="15" y="15" width="230" height="150" rx="18" fill="#dff1ff"/>
      <rect x="165" y="55" width="48" height="62" rx="6" fill="#ffffff" stroke="#4a90e2" strokeWidth="4"/>
      <circle cx="95" cy="105" r="12" fill="#ffffff" stroke="#4a90e2" strokeWidth="4"/>
      <rect x="120" y="68" width="16" height="54" rx="8" fill="#ff7675"/>
      <line x1="80" y1="105" x2="62" y2="122" stroke="#4a90e2" strokeWidth="4" strokeLinecap="round"/>
      <text x="28" y="42" fontSize="18" fill="#245b97" fontWeight="700">수비</text>
    </svg>
  );
}

function DribbleIllustration() {
  return (
    <svg viewBox="0 0 260 180" xmlns="http://www.w3.org/2000/svg">
      <rect x="15" y="15" width="230" height="150" rx="18" fill="#dff1ff"/>
      <path d="M55 125 C85 80, 120 145, 155 95 S205 65, 220 120" fill="none" stroke="#4a90e2" strokeWidth="5" strokeDasharray="8 7"/>
      <circle cx="70" cy="122" r="12" fill="#ffffff" stroke="#4a90e2" strokeWidth="4"/>
      <line x1="50" y1="145" x2="93" y2="104" stroke="#8b5e3c" strokeWidth="10" strokeLinecap="round"/>
      <rect x="88" y="95" width="42" height="14" rx="7" fill="#27ae60"/>
      <text x="28" y="42" fontSize="18" fill="#245b97" fontWeight="700">드리블</text>
    </svg>
  );
}

function ChallengeIllustration() {
  return (
    <svg viewBox="0 0 260 180" xmlns="http://www.w3.org/2000/svg">
      <rect x="15" y="15" width="230" height="150" rx="18" fill="#dff1ff"/>
      <circle cx="80" cy="112" r="12" fill="#ffffff" stroke="#4a90e2" strokeWidth="4"/>
      <line x1="60" y1="135" x2="98" y2="98" stroke="#8b5e3c" strokeWidth="10" strokeLinecap="round"/>
      <rect x="94" y="90" width="42" height="14" rx="7" fill="#f5a623"/>
      <polygon points="182,55 192,78 218,80 198,95 204,120 182,106 160,120 166,95 146,80 172,78"
        fill="#ffd54f" stroke="#e0a800" strokeWidth="3"/>
      <text x="28" y="42" fontSize="18" fill="#245b97" fontWeight="700">챌린지</text>
    </svg>
  );
}
