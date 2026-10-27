/* CampusShare UI prototype – all data is simulated in memory (resets on reload).
   Object shapes mirror the domain classes in diagrams/class_diagram.puml. */

const day = n => { const d = new Date(); d.setDate(d.getDate() + n); return d.toISOString().slice(0, 10); };
const fmt = s => s ? new Date(s + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) : '–';

/* ---- User ---- */
const users = [
  { userId: 1, fullName: 'Amina Rahman', role: 'STUDENT', status: 'ACTIVE' },
  { userId: 2, fullName: 'Tanvir Hasan', role: 'STUDENT', status: 'ACTIVE' },
  { userId: 3, fullName: 'Nusrat Jahan', role: 'STUDENT', status: 'ACTIVE' },
  { userId: 4, fullName: 'Rafiq Ahmed', role: 'STUDENT', status: 'ACTIVE' },
];
const CURRENT_USER_ID = 1; // simulated "signed in" student (no real login)

/* ---- ItemCategory ---- */
const categories = [
  { categoryId: 1, name: 'Textbooks', icon: '📚' },
  { categoryId: 2, name: 'Calculators', icon: '🧮' },
  { categoryId: 3, name: 'Stationery', icon: '✏️' },
  { categoryId: 4, name: 'Lab Accessories', icon: '🥼' },
  { categoryId: 5, name: 'Sports Equipment', icon: '🏸' },
];

/* ---- Item ---- */
const items = [
  { itemId: 1, title: 'Casio fx-991EX Calculator', description: 'Scientific calculator with fresh batteries. Good for exam weeks.', condition: 'GOOD', pickupLocation: 'Library entrance', status: 'BORROWED', ownerId: 1, categoryId: 2, emoji: '🧮' },
  { itemId: 2, title: 'Engineering Mathematics (6th ed.)', description: 'Clean copy with a few pencil notes in the margins.', condition: 'GOOD', pickupLocation: 'Main building canteen', status: 'AVAILABLE', ownerId: 3, categoryId: 1, emoji: '📘' },
  { itemId: 3, title: 'Lab Coat (Size M)', description: 'White cotton lab coat, washed and ready for practical sessions.', condition: 'GOOD', pickupLocation: 'Science block lobby', status: 'AVAILABLE', ownerId: 1, categoryId: 4, emoji: '🥼' },
  { itemId: 4, title: 'Badminton Racket Set', description: 'Two rackets and three shuttlecocks.', condition: 'FAIR', pickupLocation: 'Sports hall reception', status: 'AVAILABLE', ownerId: 4, categoryId: 5, emoji: '🏸' },
  { itemId: 5, title: 'Digital Logic Design Textbook', description: 'Hardcover, includes solved example pages.', condition: 'GOOD', pickupLocation: 'CSE department corridor', status: 'BORROWED', ownerId: 2, categoryId: 1, emoji: '📗' },
  { itemId: 6, title: 'Geometry Box and Drawing Set', description: 'Compass, set squares, ruler and protractor.', condition: 'NEW', pickupLocation: 'Architecture studio', status: 'AVAILABLE', ownerId: 3, categoryId: 3, emoji: '📐' },
  { itemId: 7, title: 'Soldering Kit', description: 'Iron, stand, and solder wire. Use in lab only.', condition: 'GOOD', pickupLocation: 'Electronics lab desk', status: 'AVAILABLE', ownerId: 1, categoryId: 4, emoji: '🔧' },
  { itemId: 8, title: 'Football (Size 5)', description: 'Lightly used, inflated.', condition: 'FAIR', pickupLocation: 'Sports hall reception', status: 'UNAVAILABLE', ownerId: 2, categoryId: 5, emoji: '⚽' },
];

/* ---- BorrowRequest ---- */
const requests = [
  { requestId: 1, itemId: 1, borrowerId: 2, message: 'Need it for my exam week', requestedStartDate: day(-4), requestedReturnDate: day(3), status: 'APPROVED' },
  { requestId: 2, itemId: 3, borrowerId: 3, message: 'For the chemistry practical on Thursday', requestedStartDate: day(2), requestedReturnDate: day(5), status: 'PENDING' },
  { requestId: 3, itemId: 7, borrowerId: 4, message: 'Need it for a one-day circuit project', requestedStartDate: day(1), requestedReturnDate: day(2), status: 'PENDING' },
  { requestId: 4, itemId: 5, borrowerId: 1, message: 'Revising for my digital logic quiz', requestedStartDate: day(-6), requestedReturnDate: day(-1), status: 'APPROVED' },
  { requestId: 5, itemId: 2, borrowerId: 1, message: 'Chapter 4 only, will return quickly', requestedStartDate: day(3), requestedReturnDate: day(8), status: 'PENDING' },
  { requestId: 6, itemId: 4, borrowerId: 1, message: 'Friendly match this weekend', requestedStartDate: day(-10), requestedReturnDate: day(-8), status: 'REJECTED' },
  { requestId: 7, itemId: 6, borrowerId: 1, message: 'Technical drawing assignment', requestedStartDate: day(-20), requestedReturnDate: day(-15), status: 'APPROVED' },
];

/* ---- BorrowTransaction (created when a request is approved) ---- */
const transactions = [
  { transactionId: 1, requestId: 1, borrowedDate: day(-4), dueDate: day(3), returnedDate: null, status: 'ACTIVE' },
  { transactionId: 2, requestId: 4, borrowedDate: day(-6), dueDate: day(-1), returnedDate: null, status: 'OVERDUE' },
  { transactionId: 3, requestId: 7, borrowedDate: day(-20), dueDate: day(-15), returnedDate: day(-15), status: 'RETURNED' },
];

/* ---- Review / Report ---- */
const reviews = [
  { reviewId: 1, transactionId: 3, reviewerId: 1, rating: 5, comment: 'Everything was complete and in great shape. Thanks Nusrat!' },
];
const reports = [];

let nextId = { item: 9, request: 8, txn: 4, review: 2, report: 1 };
let state = { q: '', cat: 0, status: 'ALL', reqTab: 'incoming', actTab: 'mine' };

/* ---- helpers ---- */
const $ = s => document.querySelector(s);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const user = id => users.find(u => u.userId === id);
const item = id => items.find(i => i.itemId === id);
const cat = id => categories.find(c => c.categoryId === id);
const me = () => user(CURRENT_USER_ID);
const initials = n => n.split(' ').map(w => w[0]).join('');
const chip = s => `<span class="chip s-${s}">${s}</span>`;
const txnOf = r => transactions.find(t => t.requestId === r.requestId);
const stars = n => '<span class="star">' + '★'.repeat(n) + '☆'.repeat(5 - n) + '</span>';

function toast(msg) {
  $('#toastBody').textContent = msg + ' (simulated)';
  bootstrap.Toast.getOrCreateInstance($('#toast'), { delay: 2600 }).show();
}
function syncOverdue() {
  transactions.forEach(t => { if (t.status === 'ACTIVE' && t.dueDate < day(0)) t.status = 'OVERDUE'; });
}
function empty(emoji, title, text, btn = '') {
  return `<div class="empty card-soft"><div class="big">${emoji}</div><h5 class="fw-bold mt-2">${title}</h5><p class="mb-3">${text}</p>${btn}</div>`;
}
function itemCard(i) {
  const o = user(i.ownerId), c = cat(i.categoryId);
  return `<div class="col-6 col-lg-3"><a href="#/item/${i.itemId}" class="text-decoration-none text-reset">
    <div class="card-soft item-card"><div class="item-thumb t${i.categoryId % 5}">${i.emoji}</div>
    <div class="p-3"><div class="d-flex justify-content-between align-items-start gap-2 mb-1">${chip(i.status)}<span class="note">${esc(c.name)}</span></div>
    <h6 class="fw-bold mb-1">${esc(i.title)}</h6><div class="note">by ${esc(o.fullName)} · ${esc(i.pickupLocation)}</div></div></div></a></div>`;
}
function miniRow(i, right, sub) {
  return `<div class="mini-row"><div class="mini-emoji t${i.categoryId % 5}">${i.emoji}</div>
    <div class="flex-grow-1"><a class="fw-bold text-decoration-none text-reset" href="#/item/${i.itemId}">${esc(i.title)}</a><div class="note">${sub}</div></div>
    <div class="text-end d-flex flex-column gap-1 align-items-end">${right}</div></div>`;
}

/* ---- screens ---- */
function viewDashboard() {
  syncOverdue();
  const my = items.filter(i => i.ownerId === CURRENT_USER_ID);
  const incoming = requests.filter(r => item(r.itemId).ownerId === CURRENT_USER_ID && r.status === 'PENDING');
  const activeBorrow = transactions.filter(t => ['ACTIVE', 'OVERDUE'].includes(t.status) && requests.find(r => r.requestId === t.requestId).borrowerId === CURRENT_USER_ID);
  const fresh = items.filter(i => i.status === 'AVAILABLE' && i.ownerId !== CURRENT_USER_ID).slice(0, 4);
  return `
  <section class="hero mb-4"><div class="row align-items-center"><div class="col-md-8">
    <p class="mb-1 fw-semibold opacity-75">Hey ${esc(me().fullName.split(' ')[0])} 👋</p>
    <h1 class="display-6">Borrow it. Share it. Skip buying it for one exam week.</h1>
    <p class="mb-3 opacity-90">Find calculators, textbooks, lab gear and sports kit from students on your campus.</p>
    <a class="btn btn-lime px-4 me-2" href="#/browse">Browse items</a><a class="btn btn-outline-light rounded-pill fw-bold" href="#/new">List an item</a>
  </div><div class="col-md-4 d-none d-md-block text-center" style="font-size:5rem">🎒</div></div></section>
  <div class="row g-3 mb-4">
    <div class="col-6 col-md-3"><div class="card-soft stat"><div class="n">${my.length}</div><div class="note">My listings (Item)</div></div></div>
    <div class="col-6 col-md-3"><div class="card-soft stat"><div class="n">${incoming.length}</div><div class="note">Requests waiting (BorrowRequest)</div></div></div>
    <div class="col-6 col-md-3"><div class="card-soft stat"><div class="n">${activeBorrow.length}</div><div class="note">Items I'm borrowing (BorrowTransaction)</div></div></div>
    <div class="col-6 col-md-3"><div class="card-soft stat"><div class="n">${categories.length}</div><div class="note">Categories (ItemCategory)</div></div></div>
  </div>
  <div class="d-flex justify-content-between align-items-center mb-2"><h4 class="section-title mb-0">Fresh on campus</h4><a href="#/browse">See all</a></div>
  <div class="row g-3 mb-4">${fresh.map(itemCard).join('')}</div>
  <h4 class="section-title">Needs your attention</h4>
  <div class="card-soft">${
    incoming.length || activeBorrow.length
      ? incoming.map(r => miniRow(item(r.itemId), chip('PENDING') + '<a class="btn btn-soft btn-sm" href="#/requests">Review</a>', `${esc(user(r.borrowerId).fullName)} wants this item`)).join('') +
        activeBorrow.map(t => { const r = requests.find(x => x.requestId === t.requestId); return miniRow(item(r.itemId), chip(t.status), `Due ${fmt(t.dueDate)}`); }).join('')
      : empty('🎉', 'All caught up', 'No pending requests or due items right now.')
  }</div>`;
}

function viewBrowse() {
  const list = items.filter(i =>
    (!state.cat || i.categoryId === state.cat) &&
    (state.status === 'ALL' || i.status === state.status) &&
    (i.title + ' ' + i.description).toLowerCase().includes(state.q.toLowerCase()));
  return `
  <h2 class="section-title mb-3">Browse items</h2>
  <div class="card-soft p-3 mb-3"><div class="row g-2">
    <div class="col-md-8"><input id="q" class="form-control" placeholder="🔎  Search calculators, textbooks, lab coat…" value="${esc(state.q)}" aria-label="Search items"></div>
    <div class="col-md-4"><select id="st" class="form-select" aria-label="Filter by status">
      ${['ALL', 'AVAILABLE', 'BORROWED', 'UNAVAILABLE'].map(s => `<option ${state.status === s ? 'selected' : ''}>${s}</option>`).join('')}</select></div>
  </div>
  <div class="d-flex flex-wrap gap-2 mt-3">
    <button class="cat-pill ${!state.cat ? 'active' : ''}" data-cat="0">All</button>
    ${categories.map(c => `<button class="cat-pill ${state.cat === c.categoryId ? 'active' : ''}" data-cat="${c.categoryId}">${c.icon} ${esc(c.name)}</button>`).join('')}
  </div></div>
  <div class="note mb-2">${list.length} item(s) found</div>
  <div class="row g-3">${list.length ? list.map(itemCard).join('') : `<div class="col-12">${empty('🕵️', 'No items match', 'Try another keyword, category or status.')}</div>`}</div>`;
}

function viewItem(id) {
  const i = item(id);
  if (!i) return empty('🤷', 'Item not found', 'This listing does not exist in the sample data.', '<a class="btn btn-brand" href="#/browse">Back to browse</a>');
  const o = user(i.ownerId), c = cat(i.categoryId), mine = i.ownerId === CURRENT_USER_ID;
  const itemReviews = reviews.filter(rv => { const t = transactions.find(t => t.transactionId === rv.transactionId); return t && requests.find(r => r.requestId === t.requestId).itemId === i.itemId; });
  const canRequest = i.status === 'AVAILABLE' && !mine;
  return `
  <a href="#/browse" class="note text-decoration-none">← Back to browse</a>
  <div class="row g-4 mt-1">
    <div class="col-md-6"><div class="detail-emoji t${i.categoryId % 5}">${i.emoji}</div></div>
    <div class="col-md-6">
      <div class="mb-2">${chip(i.status)} <span class="chip s-UNAVAILABLE">${esc(c.icon + ' ' + c.name)}</span></div>
      <h2 class="section-title">${esc(i.title)}</h2>
      <p>${esc(i.description)}</p>
      <ul class="list-unstyled note mb-3">
        <li><b>Condition:</b> ${esc(i.condition)}</li><li><b>Pickup:</b> ${esc(i.pickupLocation)}</li>
        <li><b>Owner:</b> <span class="avatar" style="width:24px;height:24px;font-size:.65rem">${initials(o.fullName)}</span> ${esc(o.fullName)}</li>
      </ul>
      ${mine ? `<div class="d-flex gap-2"><a class="btn btn-soft" href="#/edit/${i.itemId}">Edit listing</a></div><p class="note mt-2">This is your own item.</p>`
        : canRequest ? `<form id="reqForm" class="card-soft p-3">
            <h6 class="fw-bold">Request to borrow</h6>
            <div class="row g-2"><div class="col-6"><label class="note">From</label><input type="date" class="form-control" id="rs" value="${day(1)}" required></div>
            <div class="col-6"><label class="note">Return by</label><input type="date" class="form-control" id="re" value="${day(4)}" required></div></div>
            <textarea id="rm" class="form-control mt-2" rows="2" placeholder="Short message to the owner" required></textarea>
            <button class="btn btn-brand w-100 mt-2">Send borrow request</button></form>`
        : `<div class="card-soft p-3 note">This item is currently <b>${i.status}</b>, so new requests are disabled.</div>`}
      ${!mine ? '<button class="btn btn-link text-danger btn-sm mt-2 px-0" id="reportBtn">⚑ Report this item</button>' : ''}
    </div>
  </div>
  <h5 class="section-title mt-4">Reviews</h5>
  <div class="card-soft">${itemReviews.length ? itemReviews.map(rv => `<div class="mini-row"><div class="flex-grow-1">${stars(rv.rating)}<div>${esc(rv.comment)}</div><div class="note">— ${esc(user(rv.reviewerId).fullName)}</div></div></div>`).join('')
    : empty('💬', 'No reviews yet', 'Reviews appear after an item has been borrowed and returned.')}</div>`;
}

function viewForm(id) {
  const i = id ? item(id) : null;
  if (id && (!i || i.ownerId !== CURRENT_USER_ID)) return empty('🔒', 'Cannot edit', 'You can only edit your own listings.', '<a class="btn btn-brand" href="#/activity">My items</a>');
  return `
  <h2 class="section-title mb-3">${i ? 'Edit listing' : 'List an item'}</h2>
  <form id="itemForm" class="card-soft p-4" style="max-width:720px">
    <div class="mb-3"><label class="form-label fw-semibold">Title</label><input name="title" class="form-control" required maxlength="80" value="${esc(i?.title)}"></div>
    <div class="row g-3 mb-3">
      <div class="col-md-6"><label class="form-label fw-semibold">Category</label><select name="categoryId" class="form-select">${categories.map(c => `<option value="${c.categoryId}" ${i?.categoryId === c.categoryId ? 'selected' : ''}>${c.icon} ${esc(c.name)}</option>`).join('')}</select></div>
      <div class="col-md-6"><label class="form-label fw-semibold">Condition</label><select name="condition" class="form-select">${['NEW', 'GOOD', 'FAIR'].map(x => `<option ${i?.condition === x ? 'selected' : ''}>${x}</option>`).join('')}</select></div>
    </div>
    <div class="mb-3"><label class="form-label fw-semibold">Description</label><textarea name="description" class="form-control" rows="3" required>${esc(i?.description)}</textarea></div>
    <div class="mb-3"><label class="form-label fw-semibold">Pickup location</label><input name="pickupLocation" class="form-control" required value="${esc(i?.pickupLocation)}"></div>
    ${i ? `<div class="mb-3"><label class="form-label fw-semibold">Status</label><select name="status" class="form-select">${['AVAILABLE', 'UNAVAILABLE'].map(x => `<option ${i.status === x ? 'selected' : ''}>${x}</option>`).join('')}</select>${i.status === 'BORROWED' ? '<div class="note mt-1">Currently BORROWED: status changes after the return is confirmed.</div>' : ''}</div>` : ''}
    <div class="d-flex gap-2"><button class="btn btn-brand">${i ? 'Save changes' : 'Publish listing'}</button><a class="btn btn-outline-ink" href="#/activity">Cancel</a></div>
  </form>`;
}

function viewRequests() {
  syncOverdue();
  const incoming = requests.filter(r => item(r.itemId).ownerId === CURRENT_USER_ID);
  const outgoing = requests.filter(r => r.borrowerId === CURRENT_USER_ID);
  const list = state.reqTab === 'incoming' ? incoming : outgoing;
  const rows = list.slice().reverse().map(r => {
    const i = item(r.itemId), t = txnOf(r);
    let actions = '';
    if (state.reqTab === 'incoming' && r.status === 'PENDING')
      actions = `<div class="d-flex gap-1"><button class="btn btn-brand btn-sm" data-act="approve" data-id="${r.requestId}">Approve</button><button class="btn btn-danger-soft btn-sm" data-act="reject" data-id="${r.requestId}">Reject</button></div>`;
    if (state.reqTab === 'outgoing' && r.status === 'PENDING')
      actions = `<button class="btn btn-danger-soft btn-sm" data-act="cancel" data-id="${r.requestId}">Cancel request</button>`;
    const who = state.reqTab === 'incoming' ? `From ${esc(user(r.borrowerId).fullName)}` : `Owner: ${esc(user(i.ownerId).fullName)}`;
    return miniRow(i, chip(r.status) + actions, `${who} · ${fmt(r.requestedStartDate)} → ${fmt(r.requestedReturnDate)}<br>“${esc(r.message)}”${t ? ` · Transaction ${chip(t.status)}` : ''}`);
  }).join('');
  return `
  <h2 class="section-title mb-3">Borrowing requests</h2>
  <div class="nav-tabs-pill mb-3">
    <button class="tab-btn ${state.reqTab === 'incoming' ? 'active' : ''}" data-tab="incoming">Incoming (${incoming.length})</button>
    <button class="tab-btn ${state.reqTab === 'outgoing' ? 'active' : ''}" data-tab="outgoing">My requests (${outgoing.length})</button>
  </div>
  <div class="card-soft">${rows || empty('📭', 'No requests here', state.reqTab === 'incoming' ? 'When someone asks to borrow your item it will show up here.' : 'Find something useful and send your first request.', '<a class="btn btn-brand" href="#/browse">Browse items</a>')}</div>`;
}

function viewActivity() {
  syncOverdue();
  const mineItems = items.filter(i => i.ownerId === CURRENT_USER_ID);
  const borrowed = requests.filter(r => r.borrowerId === CURRENT_USER_ID && txnOf(r));
  const lent = transactions.filter(t => item(requests.find(r => r.requestId === t.requestId).itemId).ownerId === CURRENT_USER_ID);
  let body;
  if (state.actTab === 'mine') {
    body = mineItems.length ? mineItems.map(i => miniRow(i, chip(i.status) + `<a class="btn btn-soft btn-sm" href="#/edit/${i.itemId}">Edit</a>`, `${esc(cat(i.categoryId).name)} · ${esc(i.condition)}`)).join('')
      : empty('📦', 'No listings yet', 'List something you rarely use.', '<a class="btn btn-brand" href="#/new">List an item</a>');
  } else if (state.actTab === 'borrowing') {
    body = borrowed.length ? borrowed.map(r => {
      const t = txnOf(r), i = item(r.itemId), rv = reviews.find(x => x.transactionId === t.transactionId);
      const extra = t.status === 'RETURNED' ? (rv ? stars(rv.rating) : `<button class="btn btn-soft btn-sm" data-act="review" data-id="${t.transactionId}">Leave a review</button>`) : '';
      return miniRow(i, chip(t.status) + extra, `Borrowed ${fmt(t.borrowedDate)} · Due ${fmt(t.dueDate)}${t.returnedDate ? ' · Returned ' + fmt(t.returnedDate) : ''}`);
    }).join('') : empty('🎒', 'Nothing borrowed yet', 'Approved requests will appear here.');
  } else {
    body = lent.length ? lent.map(t => {
      const r = requests.find(x => x.requestId === t.requestId), i = item(r.itemId);
      const btn = t.status !== 'RETURNED' ? `<button class="btn btn-brand btn-sm" data-act="return" data-id="${t.transactionId}">Confirm returned</button>` : '';
      return miniRow(i, chip(t.status) + btn, `With ${esc(user(r.borrowerId).fullName)} · Due ${fmt(t.dueDate)}`);
    }).join('') : empty('🤝', 'Nothing lent out', 'When you approve a request, the loan is tracked here.');
  }
  return `
  <h2 class="section-title mb-3">My activity</h2>
  <div class="nav-tabs-pill mb-3">
    <button class="tab-btn ${state.actTab === 'mine' ? 'active' : ''}" data-tab="mine">My items (${mineItems.length})</button>
    <button class="tab-btn ${state.actTab === 'borrowing' ? 'active' : ''}" data-tab="borrowing">I'm borrowing (${borrowed.length})</button>
    <button class="tab-btn ${state.actTab === 'lent' ? 'active' : ''}" data-tab="lent">I've lent out (${lent.length})</button>
  </div>
  <div class="card-soft">${body}</div>
  <p class="note mt-2">Admin screens (users, categories, reports) are planned for the full application and are not part of this prototype.</p>`;
}

/* ---- actions (simulated) ---- */
function doAction(act, id) {
  id = Number(id);
  if (act === 'approve') {
    const r = requests.find(x => x.requestId === id); r.status = 'APPROVED';
    transactions.push({ transactionId: nextId.txn++, requestId: id, borrowedDate: day(0), dueDate: r.requestedReturnDate, returnedDate: null, status: 'ACTIVE' });
    item(r.itemId).status = 'BORROWED'; toast('Request approved, transaction created');
  } else if (act === 'reject') { requests.find(x => x.requestId === id).status = 'REJECTED'; toast('Request rejected'); }
  else if (act === 'cancel') { requests.find(x => x.requestId === id).status = 'CANCELLED'; toast('Request cancelled'); }
  else if (act === 'return') {
    const t = transactions.find(x => x.transactionId === id); t.status = 'RETURNED'; t.returnedDate = day(0);
    item(requests.find(r => r.requestId === t.requestId).itemId).status = 'AVAILABLE'; toast('Return confirmed, item is AVAILABLE again');
  } else if (act === 'review') {
    const c = prompt('Write a short review (rating 5 stars):'); if (c === null) return;
    reviews.push({ reviewId: nextId.review++, transactionId: id, reviewerId: CURRENT_USER_ID, rating: 5, comment: c || 'Great experience.' }); toast('Review saved');
  }
  render();
}

/* ---- router ---- */
function render() {
  const [route, arg] = (location.hash.replace('#/', '') || 'dashboard').split('/');
  const views = { dashboard: viewDashboard, browse: viewBrowse, item: () => viewItem(Number(arg)), new: () => viewForm(), edit: () => viewForm(Number(arg)), requests: viewRequests, activity: viewActivity };
  $('#app').innerHTML = (views[route] || viewDashboard)();
  document.querySelectorAll('[data-route]').forEach(a => a.classList.toggle('active', a.dataset.route === (['item'].includes(route) ? 'browse' : ['new', 'edit'].includes(route) ? 'activity' : route)));
  const pending = requests.filter(r => item(r.itemId).ownerId === CURRENT_USER_ID && r.status === 'PENDING').length;
  $('#reqBadge').textContent = pending || '';
  $('#navAvatar').textContent = initials(me().fullName);
  window.scrollTo(0, 0);
  bind(route, Number(arg));
}

function bind(route, id) {
  document.querySelectorAll('[data-act]').forEach(b => b.onclick = () => doAction(b.dataset.act, b.dataset.id));
  document.querySelectorAll('[data-tab]').forEach(b => b.onclick = () => { state[route === 'requests' ? 'reqTab' : 'actTab'] = b.dataset.tab; render(); });
  if (route === 'browse') {
    const q = $('#q'); q.oninput = () => { state.q = q.value; const pos = q.selectionStart; render(); const n = $('#q'); n.focus(); n.setSelectionRange(pos, pos); };
    $('#st').onchange = e => { state.status = e.target.value; render(); };
    document.querySelectorAll('[data-cat]').forEach(b => b.onclick = () => { state.cat = Number(b.dataset.cat); render(); });
  }
  if (route === 'item') {
    const f = $('#reqForm');
    if (f) f.onsubmit = e => {
      e.preventDefault();
      if ($('#re').value < $('#rs').value) { toast('Return date must be after start date'); return; }
      requests.push({ requestId: nextId.request++, itemId: id, borrowerId: CURRENT_USER_ID, message: $('#rm').value, requestedStartDate: $('#rs').value, requestedReturnDate: $('#re').value, status: 'PENDING' });
      toast('Borrow request sent (status PENDING)'); location.hash = '#/requests'; state.reqTab = 'outgoing'; render();
    };
    const rb = $('#reportBtn');
    if (rb) rb.onclick = () => {
      const reason = prompt('Why are you reporting this item?'); if (!reason) return;
      reports.push({ reportId: nextId.report++, itemId: id, reporterId: CURRENT_USER_ID, reason, status: 'OPEN' }); toast('Report submitted (status OPEN)');
    };
  }
  if (route === 'new' || route === 'edit') {
    $('#itemForm').onsubmit = e => {
      e.preventDefault();
      const d = Object.fromEntries(new FormData(e.target)); d.categoryId = Number(d.categoryId);
      if (route === 'edit') { Object.assign(item(id), d); toast('Listing updated'); }
      else { items.push({ itemId: nextId.item++, ...d, status: 'AVAILABLE', ownerId: CURRENT_USER_ID, emoji: cat(d.categoryId).icon }); toast('Listing published'); }
      location.hash = '#/activity'; state.actTab = 'mine'; render();
    };
  }
}

window.addEventListener('hashchange', render);
render();
