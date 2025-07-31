import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">H</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                HPLankr Tools
              </span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="#tools" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
                도구
              </Link>
              <Link href="#about" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
                소개
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-16 sm:py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-8">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              정확하고 빠른 계산 도구
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">
                필수 계산기 모음
              </span>
              <br />
              <span className="text-gray-700">모든 것을 한 곳에서</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              일상에서 자주 사용하는 계산을 정확하고 빠르게 처리할 수 있는 
              전문적인 도구들을 제공합니다.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                href="#tools"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                계산기 사용하기
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <div className="text-sm text-gray-500 flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                100% 무료 사용
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section id="tools" className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              프로페셔널 계산 도구
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              각 도구는 정확성과 사용성을 고려하여 전문적으로 개발되었습니다
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8 max-w-7xl mx-auto">
            {[
              {
                href: "/bmi",
                icon: "⚖️",
                title: "BMI 계산기",
                description: "체질량지수를 정확하게 계산하고 건강 상태를 확인하세요",
                gradient: "from-blue-600 to-blue-700",
                bgGradient: "from-blue-50 to-blue-100"
              },
              {
                href: "/converter",
                icon: "📏",
                title: "단위 변환기",
                description: "길이, 무게, 온도 등 다양한 단위를 간편하게 변환하세요",
                gradient: "from-emerald-600 to-emerald-700",
                bgGradient: "from-emerald-50 to-emerald-100"
              },
              {
                href: "/percent",
                icon: "📊",
                title: "퍼센트 계산기",
                description: "할인율, 증가율, 비율 등 퍼센트 계산을 정확하게",
                gradient: "from-purple-600 to-purple-700",
                bgGradient: "from-purple-50 to-purple-100"
              },
              {
                href: "/age",
                icon: "🎂",
                title: "나이 계산기",
                description: "만 나이, 세는 나이를 포함한 상세한 나이 정보 제공",
                gradient: "from-rose-600 to-rose-700",
                bgGradient: "from-rose-50 to-rose-100"
              },
              {
                href: "/compound",
                icon: "💰",
                title: "복리 계산기",
                description: "투자와 저축의 복리 효과를 계산하여 재정 계획을 세우세요",
                gradient: "from-emerald-600 to-emerald-700",
                bgGradient: "from-emerald-50 to-emerald-100"
              }
            ].map((tool, index) => (
              <Link key={index} href={tool.href} className="group block">
                <div className={`relative bg-gradient-to-br ${tool.bgGradient} p-8 rounded-2xl border border-white/50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full`}>
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${tool.gradient} rounded-2xl text-white text-2xl mb-6 shadow-lg`}>
                    {tool.icon}
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {tool.description}
                  </p>
                  
                  {/* Arrow */}
                  <div className="flex items-center mt-6 text-gray-400 group-hover:text-gray-600 transition-colors">
                    <span className="text-sm font-medium">사용하기</span>
                    <svg className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: "⚡",
                title: "빠른 계산",
                description: "최적화된 알고리즘으로 즉시 정확한 결과를 제공합니다"
              },
              {
                icon: "📱",
                title: "반응형 디자인",
                description: "모바일, 태블릿, 데스크톱 모든 기기에서 완벽하게 작동합니다"
              },
              {
                icon: "🔒",
                title: "개인정보 보호",
                description: "모든 계산은 브라우저에서 처리되어 개인정보가 안전합니다"
              }
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl text-2xl mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">H</span>
              </div>
              <span className="text-xl font-bold text-white">HPLankr Tools</span>
            </div>
            <p className="text-gray-400 text-sm">
              © 2025 HPLankr Tools. 모든 권리 보유.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
