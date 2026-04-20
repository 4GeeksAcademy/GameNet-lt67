import React from 'react';
import { TrendingUp, Gamepad2, Trophy, Calendar } from 'lucide-react';
import { AIRecommendations } from './AIRecommendations';

export function Sidebar() {
    const trendingGames = [
        { name: 'Elden Ring: Shadow of the Erdtree', trend: '+245%' },
        { name: 'Helldivers 2', trend: '+189%' },
        { name: 'Palworld', trend: '+156%' },
        { name: 'Black Myth: Wukong', trend: '+142%' },
        { name: 'Dragon\'s Dogma 2', trend: '+98%' },
    ];

    const upcomingEvents = [
        { name: 'Summer Game Fest', date: 'Jun 7, 2026' },
        { name: 'E3 2026', date: 'Jun 13, 2026' },
        { name: 'Gamescom', date: 'Aug 20, 2026' },
    ];

    return (
        <aside className="d-flex flex-column gap-3">

            {/* Trending Games */}
            <div className="card sidebar-card">
                <div className="card-body p-3">
                    <div className="d-flex align-items-center gap-2 mb-3">
                        <div className="icon-box bg-grad-pink">
                            <TrendingUp size={16} className="text-white" />
                        </div>
                        <h2 className="h6 fw-bold m-0 text-white">Trending Games</h2>
                    </div>
                    <div className="d-flex flex-column gap-3">
                        {trendingGames.map((game, index) => (
                            <div key={index} className="d-flex align-items-start justify-content-between gap-2 sidebar-item">
                                <div className="d-flex gap-2">
                                    <span className="text-secondary small mt-1">#{index + 1}</span>
                                    <p className="small m-0 item-text">{game.name}</p>
                                </div>
                                <span className="trend-badge">{game.trend}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <AIRecommendations/>

            {/* Upcoming Events */}
            <div className="card sidebar-card">
                <div className="card-body p-3">
                    <div className="d-flex align-items-center gap-2 mb-3">
                        <div className="icon-box bg-grad-blue">
                            <Calendar size={16} className="text-white" />
                        </div>
                        <h2 className="h6 fw-bold m-0 text-white">Upcoming Events</h2>
                    </div>
                    <div className="d-flex flex-column gap-3">
                        {upcomingEvents.map((event, index) => (
                            <div key={index} className="sidebar-item">
                                <p className="small fw-medium m-0 item-text">{event.name}</p>
                                <p className="x-small text-secondary m-0">{event.date}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Categories / Quick Actions */}
            <div className="card sidebar-card">
                <div className="card-body p-3">
                    <div className="d-flex align-items-center gap-2 mb-3">
                        <div className="icon-box bg-grad-purple">
                            <Gamepad2 size={16} className="text-white" />
                        </div>
                        <h2 className="h6 fw-bold m-0 text-white">Categories</h2>
                    </div>
                    <div className="d-flex flex-column gap-1">
                        <button className="btn btn-sidebar-action">
                            <Trophy size={16} className="me-2" />
                            Esports
                        </button>
                        <button className="btn btn-sidebar-action">
                            <Gamepad2 size={16} className="me-2" />
                            New Releases
                        </button>
                        <button className="btn btn-sidebar-action">
                            <TrendingUp size={16} className="me-2" />
                            Updates
                        </button>
                    </div>
                </div>
            </div>

        </aside>
    );
}