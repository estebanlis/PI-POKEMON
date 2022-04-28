

export const Filters =(pokes,filters) => {

    let pokFilter = pokes;

    if (filters.PokApi) {
        pokFilter = pokFilter.filter(p => typeof p.id !== 'string');

        if (filters.TypePok !== 'todos') {
            pokFilter = pokFilter.filter(p => {
                if (p.type.find(t => t === filters.TypePok)) return p;
            })

        }
        if (filters.orderAZ) {
            pokFilter = pokFilter.sort(SortArray);
        }

        if (filters.orderZA) {
            pokFilter = pokFilter.reverse(SortArray);
        }
        if (filters.orderUpAttack) {
            pokFilter = pokFilter.sort(function (a, b) {
                if (a.attack > b.attack) {
                    return -1;
                }
                if (b.attack > a.attack) {
                    return 1;
                }
                return 0;
            })
        }
        if (filters.orderDownAttack) {
            pokFilter = pokFilter.sort(function (a, b) {
                if (a.attack > b.attack) {
                    return 1;
                }
                if (b.attack > a.attack) {
                    return -1;
                }
                return 0;
            })
        }
    }

    if (filters.PokLocales) {
        pokFilter = pokFilter.filter(p => typeof p.id === 'string');

        if (filters.TypePok !== 'todos') {
            pokFilter = pokFilter.filter(p => {
                if (p.type.find(t => t === filters.TypePok)) return p;
            })

        }
        if (filters.orderAZ) {
            pokFilter = pokFilter.sort(SortArray);
        }

        if (filters.orderZA) {
            pokFilter = pokFilter.reverse(SortArray);
        }
        if (filters.orderUpAttack) {
            pokFilter = pokFilter.sort(function (a, b) {
                if (a.attack > b.attack) {
                    return -1;
                }
                if (b.attack > a.attack) {
                    return 1;
                }
                return 0;
            })
        }
        if (filters.orderDownAttack) {
            pokFilter = pokFilter.sort(function (a, b) {
                if (a.attack > b.attack) {
                    return 1;
                }
                if (b.attack > a.attack) {
                    return -1;
                }
                return 0;
            })
        }
    }

    if (filters.Todos) {

        if (filters.TypePok !== 'todos') {
            pokFilter = pokFilter.filter(p => {
                if (p.type.find(t => t === filters.TypePok)) return p;
            })

        }
        if (filters.orderAZ) {
            pokFilter = pokFilter.sort(SortArray);
        }

        if (filters.orderZA) {
            pokFilter = pokFilter.reverse(SortArray);
        }
        if (filters.orderUpAttack) {
            pokFilter = pokFilter.sort(function (a, b) {
                if (a.attack > b.attack) {
                    return -1;
                }
                if (b.attack > a.attack) {
                    return 1;
                }
                return 0;
            })
        }
        if (filters.orderDownAttack) {
            pokFilter = pokFilter.sort(function (a, b) {
                if (a.attack > b.attack) {
                    return 1;
                }
                if (b.attack > a.attack) {
                    return -1;
                }
                return 0;
            })
        }
    }

  return {pokFilter}
    
  
}

const  SortArray = (x, y) => {
       
    return x.name.localeCompare(y.name);
  }