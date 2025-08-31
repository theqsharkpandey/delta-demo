const costumesData = [
            { id: 1, name: "Galactic Knight", category: "Sci-Fi", price: 120, rent: 35, seller: "CosplayCreations", rating: 4.8, canRent: true, canBuy: true, image: "https://placehold.co/600x800/1E293B/FFFFFF?text=Galactic+Knight", description: "A high-quality armor set for aspiring guardians of the galaxy. Includes helmet, chest plate, and light sword prop.", featured: true, bookings: [{ start: new Date(2025, 8, 5), end: new Date(2025, 8, 8)}, { start: new Date(2025, 8, 20), end: new Date(2025, 8, 22)}] },
            { id: 2, name: "Daredevil Costume", category: "Superhero", price: 250, rent: 60, seller: "MysticWears", rating: 4.9, canRent: true, canBuy: true, image: "https://i.etsystatic.com/59172297/r/il/11b7c5/7124396773/il_fullxfull.7124396773_160p.jpg", description: "A high-quality, full-body suit inspired by the Man Without Fear, perfect for cosplay, conventions, or Halloween.", featured: true, bookings: [{ start: new Date(2025, 8, 10), end: new Date(2025, 8, 12)}]},
            { id: 3, name: "Steampunk Inventor", category: "Steampunk", price: 180, rent: 45, seller: "Gear & Goggle", rating: 4.7, canRent: true, canBuy: true, image: "https://placehold.co/600x800/78350F/FFFFFF?text=Inventor", description: "A complete Steampunk outfit featuring a vest, goggles, and various gear-adorned accessories.", bookings: []},
            { id: 4, name: "Viking Warrior", category: "Historical", price: 95, rent: 30, seller: "Valhalla Garb", rating: 4.6, canRent: true, canBuy: true, image: "https://placehold.co/600x800/44403C/FFFFFF?text=Viking", description: "Authentic-looking Viking tunic, trousers, and faux-fur cape. Axe prop not included.", bookings: [{ start: new Date(2025, 9, 30), end: new Date(2025, 10, 2)}]},
            { id: 5, name: "Classic Superhero", category: "Superhero", price: 75, rent: 25, seller: "ComicCloset", rating: 4.5, canRent: true, canBuy: true, image: "https://placehold.co/600x800/DC2626/FFFFFF?text=Superhero", description: "A timeless superhero costume with a cape, mask, and bold emblem. Available in various colors.", featured: true, bookings: []},
            { id: 6, name: "1920s Flapper", category: "Historical", price: 85, rent: 0, seller: "RetroThreads", rating: 4.8, canRent: false, canBuy: true, image: "https://placehold.co/600x800/171717/FFFFFF?text=Flapper", description: "A dazzling, beaded flapper dress that will transport you to the Roaring Twenties.", bookings: []},
            { id: 7, name: "Deep Sea Diver", category: "Adventure", price: 0, rent: 55, seller: "Oceanic Outfitters", rating: 4.4, canRent: true, canBuy: false, image: "https://placehold.co/600x800/0E7490/FFFFFF?text=Diver", description: "A vintage-style deep sea diver suit with a large copper-colored helmet.", featured: true, bookings: []},
            { id: 8, name: "Royal Pharaoh", category: "Historical", price: 150, rent: 40, seller: "Nile Attire", rating: 4.7, canRent: true, canBuy: true, image: "https://placehold.co/600x800/F59E0B/FFFFFF?text=Pharaoh", description: "Rule the Nile in this majestic Pharaoh costume, complete with a nemes headdress and ornate collar.", bookings: [{ start: new Date(2025, 8, 15), end: new Date(2025, 8, 15)}]},
        ];

        let state = {
            currentPage: 'home',
            cart: [],
            currentCalendar: {
                month: new Date().getMonth(),
                year: new Date().getFullYear(),
                startDate: null,
                endDate: null
            }
        };

        const views = ['home-view', 'browse-view', 'product-detail-view', 'dashboard-view'];
        const navLinks = ['nav-home', 'nav-browse', 'nav-dashboard'];

        function navigateTo(pageId) {
            views.forEach(view => {
                const el = document.getElementById(view);
                if (el) el.classList.add('hidden');
            });
            const targetView = document.getElementById(`${pageId}-view`);
            if (targetView) targetView.classList.remove('hidden');
            state.currentPage = pageId;
            window.scrollTo(0, 0);
        }

        function setActiveNav(pageId) {
             const targetNavLinkId = pageId === 'product-detail' ? 'nav-browse' : `nav-${pageId}`;
             navLinks.forEach(navId => {
                const el = document.getElementById(navId);
                if (el) {
                    el.classList.remove('active-nav');
                    el.classList.add('inactive-nav');
                }
             });
             const activeLink = document.getElementById(targetNavLinkId);
             if (activeLink) {
                activeLink.classList.add('active-nav');
                activeLink.classList.remove('inactive-nav');
             }
             if (pageId !== 'product-detail') {
                 navigateTo(pageId);
             }
        }
        
        function renderProductCard(costume, isClickable = true) {
            const buyButton = costume.canBuy ? `<p class="text-xl font-bold text-gray-800">$${costume.price.toFixed(2)}</p>` : `<p class="text-gray-400">Not for sale</p>`;
            const rentButton = costume.canRent ? `<p class="text-sm text-gray-600">Rent: $${costume.rent.toFixed(2)}/day</p>` : `<p class="text-sm text-gray-400">Not for rent</p>`;
            const clickableClass = isClickable ? 'cursor-pointer hover:shadow-xl transition-shadow duration-300' : '';

            return `
                <div class="bg-white rounded-lg shadow-md overflow-hidden ${clickableClass}" ${isClickable ? `onclick="showProductDetail(${costume.id})"` : ''}>
                    <img src="${costume.image}" alt="${costume.name}" class="w-full h-80 object-cover">
                    <div class="p-4">
                        <h3 class="text-lg font-semibold truncate">${costume.name}</h3>
                        <p class="text-sm text-gray-500 mb-2">by ${costume.seller}</p>
                        <div class="flex justify-between items-center">
                            <div>
                                ${buyButton}
                                ${rentButton}
                            </div>
                            <div class="text-right">
                                <span class="text-yellow-500">${'★'.repeat(Math.round(costume.rating))}${'☆'.repeat(5-Math.round(costume.rating))}</span>
                                <p class="text-xs text-gray-500">${costume.rating} stars</p>
                            </div>
                        </div>
                    </div>
                </div>`;
        }
        
        function renderProductGrid(costumesToShow) {
            const grid = document.getElementById('product-grid');
            if (!grid) return;
            if (costumesToShow.length === 0) {
                 grid.innerHTML = `<p class="col-span-full text-center text-gray-500">No costumes found matching your criteria.</p>`;
                 return;
            }
            grid.innerHTML = costumesToShow.map(c => renderProductCard(c)).join('');
        }

        function showProductDetail(costumeId) {
            const costume = costumesData.find(c => c.id === costumeId);
            if (!costume) return;

            const detailView = document.getElementById('product-detail-view');
            
            const buySection = costume.canBuy ? `
                <div class="p-4 bg-gray-50 rounded-md">
                    <div class="flex justify-between items-center">
                        <div>
                            <p class="text-gray-600">Buy it now</p>
                            <p class="text-3xl font-bold text-gray-800">$${costume.price.toFixed(2)}</p>
                        </div>
                        <button onclick="addToCart(${costume.id}, 'buy')" class="bg-orange-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-orange-600 transition">Add to Cart</button>
                    </div>
                </div>` : '';
            
            const rentSection = costume.canRent ? `
                <div class="p-4 bg-gray-50 rounded-md">
                    <p class="text-gray-600 mb-2">Rent this costume</p>
                    <p class="text-3xl font-bold text-gray-800">$${costume.rent.toFixed(2)}<span class="text-lg font-normal"> / day</span></p>
                    <p class="text-sm text-gray-500 mt-1">Security Deposit: $${(costume.rent * 2).toFixed(2)}</p>
                    <div class="mt-4">
                        <h4 class="font-semibold mb-2">Select Rental Dates</h4>
                        <div id="calendar-container" class="bg-white p-2 rounded-md border"></div>
                    </div>
                    <div id="rental-summary" class="mt-4"></div>
                    <button id="rent-button" onclick="addToCart(${costume.id}, 'rent')" disabled class="w-full mt-4 bg-violet-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-violet-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed">Select Dates to Rent</button>
                </div>` : '';
            
            detailView.innerHTML = `
                <div class="grid md:grid-cols-2 gap-8 lg:gap-12">
                    <div>
                        <img src="${costume.image}" alt="${costume.name}" class="w-full rounded-lg shadow-lg">
                    </div>
                    <div>
                        <button class="text-violet-600 mb-4" onclick="setActiveNav('browse')">&larr; Back to Browse</button>
                        <h2 class="text-4xl font-bold mb-2">${costume.name}</h2>
                        <p class="text-md text-gray-500 mb-4">Sold by <span class="font-semibold text-violet-600">${costume.seller}</span></p>
                        <div class="flex items-center mb-4">
                            <span class="text-yellow-500 text-lg">${'★'.repeat(Math.round(costume.rating))}${'☆'.repeat(5-Math.round(costume.rating))}</span>
                            <span class="ml-2 text-gray-600">${costume.rating} / 5.0</span>
                        </div>
                        <p class="text-gray-700 leading-relaxed mb-6">${costume.description}</p>
                        <div class="space-y-4">
                            ${buySection}
                            ${rentSection}
                        </div>
                    </div>
                </div>`;
            
            if(costume.canRent) {
                state.currentCalendar = { month: new Date().getMonth(), year: new Date().getFullYear(), startDate: null, endDate: null };
                renderCalendar(costume.id);
            }
            setActiveNav('product-detail');
            navigateTo('product-detail');
        }

        function renderCalendar(costumeId) {
            const costume = costumesData.find(c => c.id === costumeId);
            const { month, year } = state.currentCalendar;
            const calendarContainer = document.getElementById('calendar-container');
            if(!calendarContainer) return;
            
            const firstDay = new Date(year, month, 1).getDay();
            const daysInMonth = new Date(year, month + 1, 0).getDate();
            const today = new Date();
            today.setHours(0,0,0,0);

            const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

            let html = `
                <div class="flex justify-between items-center mb-2 px-2">
                    <button onclick="prevMonth(${costumeId})">&larr;</button>
                    <h5 class="font-bold">${monthNames[month]} ${year}</h5>
                    <button onclick="nextMonth(${costumeId})">&rarr;</button>
                </div>
                <table class="w-full text-center text-sm">
                    <thead><tr>${['S','M','T','W','T','F','S'].map(d => `<th class="w-1/7 py-1">${d}</th>`).join('')}</tr></thead>
                    <tbody>`;
            
            let date = 1;
            for (let i = 0; i < 6; i++) {
                html += '<tr>';
                for (let j = 0; j < 7; j++) {
                    if (i === 0 && j < firstDay) {
                        html += '<td></td>';
                    } else if (date > daysInMonth) {
                        break;
                    } else {
                        const currentDate = new Date(year, month, date);
                        currentDate.setHours(0,0,0,0);
                        let classes = 'calendar-day p-2 rounded-full cursor-pointer';
                        let isDisabled = currentDate < today;
                        let isBooked = costume.bookings.some(b => currentDate >= b.start && currentDate <= b.end);
                        
                        if(isDisabled) classes += ' disabled';
                        if(isBooked) classes += ' booked';

                        if (state.currentCalendar.startDate) {
                             if (currentDate.getTime() === state.currentCalendar.startDate.getTime()) {
                                classes += ' selected';
                            } else if (state.currentCalendar.endDate && currentDate.getTime() === state.currentCalendar.endDate.getTime()) {
                                classes += ' selected';
                            } else if (state.currentCalendar.startDate && state.currentCalendar.endDate && currentDate > state.currentCalendar.startDate && currentDate < state.currentCalendar.endDate) {
                                classes += ' in-range';
                            }
                        }

                        html += `<td><div class="${classes}" ${(!isDisabled && !isBooked) ? `onclick="selectDate(${costumeId}, ${year}, ${month}, ${date})"`: ''}>${date}</div></td>`;
                        date++;
                    }
                }
                html += '</tr>';
                if (date > daysInMonth) break;
            }

            html += `</tbody></table>`;
            calendarContainer.innerHTML = html;
        }

        function prevMonth(costumeId) {
            state.currentCalendar.month--;
            if (state.currentCalendar.month < 0) {
                state.currentCalendar.month = 11;
                state.currentCalendar.year--;
            }
            renderCalendar(costumeId);
        }

        function nextMonth(costumeId) {
            state.currentCalendar.month++;
            if (state.currentCalendar.month > 11) {
                state.currentCalendar.month = 0;
                state.currentCalendar.year++;
            }
            renderCalendar(costumeId);
        }
        
        function selectDate(costumeId, year, month, day) {
            const selectedDate = new Date(year, month, day);
            const { startDate, endDate } = state.currentCalendar;

            if (!startDate || (startDate && endDate)) {
                state.currentCalendar.startDate = selectedDate;
                state.currentCalendar.endDate = null;
            } else if (selectedDate < startDate) {
                 state.currentCalendar.startDate = selectedDate;
            } else {
                state.currentCalendar.endDate = selectedDate;
                // Check if range is valid
                const costume = costumesData.find(c => c.id === costumeId);
                const isRangeValid = !costume.bookings.some(b => {
                    const bookingStart = new Date(b.start);
                    const bookingEnd = new Date(b.end);
                    return (state.currentCalendar.startDate < bookingEnd && state.currentCalendar.endDate > bookingStart);
                });
                if(!isRangeValid) {
                    alert("Selected range includes a booked date. Please choose a different range.");
                    state.currentCalendar.startDate = null;
                    state.currentCalendar.endDate = null;
                }
            }
            
            updateRentalSummary(costumeId);
            renderCalendar(costumeId);
        }
        
        function updateRentalSummary(costumeId) {
            const summaryDiv = document.getElementById('rental-summary');
            const rentButton = document.getElementById('rent-button');
            if(!summaryDiv || !rentButton) return;
            
            const { startDate, endDate } = state.currentCalendar;
            if(startDate && endDate) {
                const diffTime = Math.abs(endDate - startDate);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
                const costume = costumesData.find(c => c.id === costumeId);
                const totalCost = diffDays * costume.rent;
                
                summaryDiv.innerHTML = `
                    <p class="font-semibold">Selected Period:</p>
                    <p>${startDate.toLocaleDateString()} to ${endDate.toLocaleDateString()} (${diffDays} days)</p>
                    <p class="font-bold mt-2">Total Rent: $${totalCost.toFixed(2)}</p>
                `;
                rentButton.disabled = false;
                rentButton.textContent = `Rent for ${diffDays} Days`;
            } else {
                summaryDiv.innerHTML = '';
                rentButton.disabled = true;
                rentButton.textContent = 'Select Dates to Rent';
            }
        }

        function setupFilters() {
            const categories = [...new Set(costumesData.map(c => c.category))];
            const categoryFilters = document.getElementById('category-filters');
            categoryFilters.innerHTML = categories.map(cat => `
                <div class="flex items-center">
                    <input id="cat-${cat}" name="category" type="checkbox" value="${cat}" class="h-4 w-4 text-violet-600 border-gray-300 rounded focus:ring-violet-500">
                    <label for="cat-${cat}" class="ml-2 block text-sm text-gray-900">${cat}</label>
                </div>
            `).join('');

            const priceFilter = document.getElementById('price-filter');
            const priceValue = document.getElementById('price-value');
            priceFilter.addEventListener('input', (e) => {
                priceValue.textContent = e.target.value;
            });
            
            document.getElementById('apply-filters').addEventListener('click', applyFilters);
        }
        
        function applyFilters() {
            const price = parseInt(document.getElementById('price-filter').value);
            const selectedCategories = [...document.querySelectorAll('input[name="category"]:checked')].map(el => el.value);
            const transactionType = document.querySelector('input[name="transaction_type"]:checked').value;
            
            let filteredCostumes = costumesData.filter(c => {
                const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(c.category);
                const priceMatch = (c.canBuy && c.price <= price) || (c.canRent && c.rent <= price);
                const typeMatch = transactionType === 'all' || 
                                  (transactionType === 'buy' && c.canBuy) ||
                                  (transactionType === 'rent' && c.canRent);
                return categoryMatch && priceMatch && typeMatch;
            });

            renderProductGrid(filteredCostumes);
        }

        function handleSearch() {
            const searchTerm = document.getElementById('search-bar').value.toLowerCase();
            if(!searchTerm) {
                renderProductGrid(costumesData);
                return;
            }
            const filteredCostumes = costumesData.filter(c => 
                c.name.toLowerCase().includes(searchTerm) ||
                c.description.toLowerCase().includes(searchTerm) ||
                c.category.toLowerCase().includes(searchTerm)
            );
            renderProductGrid(filteredCostumes);
            setActiveNav('browse');
        }

        function toggleCart() {
            document.getElementById('cart-modal').classList.toggle('hidden');
        }
        
        function addToCart(costumeId, type) {
            const costume = costumesData.find(c => c.id === costumeId);
            let item = { ...costume, type: type, cartId: Date.now() };
            if (type === 'rent') {
                const { startDate, endDate } = state.currentCalendar;
                if (!startDate || !endDate) {
                    alert("Please select a rental period.");
                    return;
                }
                const diffTime = Math.abs(endDate - startDate);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
                item.rentalInfo = { startDate, endDate, days: diffDays };
                item.totalPrice = diffDays * costume.rent;
            } else {
                 item.totalPrice = costume.price;
            }
            state.cart.push(item);
            updateCart();
            toggleCart();
        }

        function removeFromCart(cartId) {
            state.cart = state.cart.filter(item => item.cartId !== cartId);
            updateCart();
        }

        function updateCart() {
            const cartItemsContainer = document.getElementById('cart-items');
            const cartCount = document.getElementById('cart-count');
            const cartTotalEl = document.getElementById('cart-total');
            const cartFooter = document.getElementById('cart-footer');

            cartCount.textContent = state.cart.length;

            if (state.cart.length === 0) {
                cartItemsContainer.innerHTML = `<p class="text-center text-gray-500">Your cart is empty.</p>`;
                cartFooter.classList.add('hidden');
            } else {
                cartItemsContainer.innerHTML = state.cart.map(item => `
                    <div class="flex items-start justify-between py-3">
                        <div class="flex">
                            <img src="${item.image}" alt="${item.name}" class="h-20 w-16 object-cover rounded-md mr-4">
                            <div>
                                <h4 class="font-semibold">${item.name}</h4>
                                ${ item.type === 'rent' ? 
                                    `<p class="text-sm text-gray-500">Renting for ${item.rentalInfo.days} days</p>
                                     <p class="text-xs text-gray-500">${item.rentalInfo.startDate.toLocaleDateString()} - ${item.rentalInfo.endDate.toLocaleDateString()}</p>` :
                                    `<p class="text-sm text-gray-500">Buying</p>`
                                }
                            </div>
                        </div>
                        <div class="text-right">
                             <p class="font-semibold">$${item.totalPrice.toFixed(2)}</p>
                             <button onclick="removeFromCart(${item.cartId})" class="text-xs text-red-500 hover:text-red-700">Remove</button>
                        </div>
                    </div>
                `).join('');
                cartFooter.classList.remove('hidden');
            }

            const total = state.cart.reduce((sum, item) => sum + item.totalPrice, 0);
            cartTotalEl.textContent = `$${total.toFixed(2)}`;
        }

        // Initial setup
        document.addEventListener('DOMContentLoaded', () => {
            const featuredGrid = document.getElementById('featured-grid');
            const featuredCostumes = costumesData.filter(c => c.featured);
            if (featuredGrid) {
                 featuredGrid.innerHTML = featuredCostumes.map(c => renderProductCard(c)).join('');
            }
            
            renderProductGrid(costumesData);
            setupFilters();
            
            document.querySelectorAll('a[href="#"]').forEach(anchor => {
                anchor.addEventListener('click', e => e.preventDefault());
            });

            document.getElementById('search-bar').addEventListener('keypress', function (e) {
                if (e.key === 'Enter') {
                    handleSearch();
                }
            });

            const salesCtx = document.getElementById('salesChart');
            if(salesCtx) {
                new Chart(salesCtx, {
                    type: 'bar',
                    data: {
                        labels: ['June', 'July', 'August'],
                        datasets: [
                        {
                            label: 'Sales',
                            data: [1200, 950, 1500],
                            backgroundColor: 'rgba(249, 115, 22, 0.6)',
                            borderColor: 'rgba(249, 115, 22, 1)',
                            borderWidth: 1
                        },
                        {
                            label: 'Rentals',
                            data: [850, 1100, 650],
                            backgroundColor: 'rgba(139, 92, 246, 0.6)',
                            borderColor: 'rgba(139, 92, 246, 1)',
                            borderWidth: 1
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            y: { beginAtZero: true, ticks: { callback: function(value) { return '$' + value; } } }
                        }
                    }
                });
            }
        });