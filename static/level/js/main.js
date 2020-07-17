let sortNameAsc = true;
let sortSkillAsc = true;
const btnSortName = '#btnSortName';
const btnSortSkill = '#btnSortSkill';
const btnFilterCubi = '#btnFilterCubi';
const btnFilterScratch = '#btnFilterScratch';

REOrganizer.init('.level');

let reoSettings = {
    sort: 'title',
    reverse: false,
    filter: 'none'
}

function applySortAndFilter() {
    REOrganizer.organize(reoSettings.sort, reoSettings.reverse, reoSettings.filter);
}

applySortAndFilter();

function filterApp(app) {
    selectFilter(app);
    applySortAndFilter();
}

function sortName() {
    if (reoSettings.sort === 'title') {
        sortNameAsc = !sortNameAsc;
    }
    selectSort('title');
    reoSettings.sort = 'title';
    reoSettings.reverse = !sortNameAsc;
    applySortAndFilter();
}

function sortSkill() {
    if (reoSettings.sort === 'difficulty') {
        sortSkillAsc = !sortSkillAsc;
    }
    selectSort('difficulty');
    reoSettings.sort = 'difficulty';
    reoSettings.reverse = !sortSkillAsc;
    applySortAndFilter();
}

function selectSort(sort) {
    reoSettings.sort = sort;
    if (reoSettings.sort === 'title') {
        $(btnSortName).addClass('selected');
        $(btnSortSkill).removeClass('selected');
        if (sortNameAsc) {
            changeIcon(btnSortName,'level-down-alt');
        } else {
            changeIcon(btnSortName,'level-up-alt');
        }
    } else {
        $(btnSortSkill).addClass('selected');
        $(btnSortName).removeClass('selected');
        if (sortSkillAsc) {
            changeIcon(btnSortSkill,'level-down-alt');
        } else {
            changeIcon(btnSortSkill,'level-up-alt');
        }
    }
}

function selectFilter(filter) {
    if (reoSettings.filter === filter) {
        reoSettings.filter = 'none';
    } else {
        reoSettings.filter = filter;
    }
    if (reoSettings.filter === 'cubi') {
        $(btnFilterCubi).addClass('selected');
        $(btnFilterScratch).removeClass('selected');
    } else if (reoSettings.filter === 'scratch') {
        $(btnFilterScratch).addClass('selected');
        $(btnFilterCubi).removeClass('selected');
    } else {
        $(btnFilterCubi).removeClass('selected');
        $(btnFilterScratch).removeClass('selected');
    }
}

function changeIcon(element, icon) {
    $(element).find('i.fa').removeClass('fa-level-up-alt').removeClass('fa-level-down-alt').addClass('fa-' + icon)
}