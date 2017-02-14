# -*- coding:utf-8 -*-


<<<<<<< HEAD
def move(ndisks, startPeg, endPeg,tmp_v,return_list):
    # move: moves a pile of shapes from the source color to the target color
    if ndisks:
        move(ndisks-1, startPeg, 3-startPeg-endPeg, tmp_v, return_list)
        element = -tmp_v[-1::-1].index(startPeg)-1
        tmp_v[element] = endPeg
        return_list.append([startPeg, endPeg, abs(element+1)])
        move(ndisks-1, 3-startPeg-endPeg, endPeg, tmp_v, return_list)


=======
def move(n, tmp_v, source, target, auxiliary, return_list):
    # move: moves a pile of shapes from the source color to the target color
    if n > 0:
        move(n-1, tmp_v, source, auxiliary, target, return_list)
        element = -tmp_v[-1::-1].index(source)-1
        tmp_v[element] = target
        return_list.append([source, target, abs(element+1)])
        move(n-1, tmp_v, auxiliary, target, source, return_list)
>>>>>>> dbabcb9eac1bdda86be5484c3a7f5c9e911395cb
def hanoiMoves(vitamin,tmp_v, size):
    # hanoiMoves: starts from the final stage searching where to put the next disk from the bottom of the pile
    return_values=[]
    for i in xrange(size-1, -1, -1):
        t = -1-i
        if vitamin[t] == tmp_v[t]:
            continue
        if i > 0:
<<<<<<< HEAD
            move(i, tmp_v[t], 3 - vitamin[t] - tmp_v[t], tmp_v, return_values)
        return_values.append([tmp_v[t], vitamin[t], i])
        tmp_v[t] = vitamin[t]
    return return_values


=======
            move(i, tmp_v, tmp_v[t], 3-vitamin[t]-tmp_v[t], vitamin[t], return_values)
        return_values.append([tmp_v[t], vitamin[t], i])
        tmp_v[t] = vitamin[t]
    return return_values
>>>>>>> dbabcb9eac1bdda86be5484c3a7f5c9e911395cb
def reverseMovesAddNames(l,names,s_vitamin):
    # reverseMovesAddNames: changes the order and add the proper names to the array of the moves
    result = []
    for item in l[::-1]:
        tmp = [names[-1 - item[2]], s_vitamin[item[1]], s_vitamin[item[0]]]
        result.append(tmp)
    return result
<<<<<<< HEAD


=======
>>>>>>> dbabcb9eac1bdda86be5484c3a7f5c9e911395cb
def makeAllWhite(Vitamin_String):
    # makeAllWhite: return the array of moves needed to set all of the colors
    # of the shapes to white accordingly with the Maxi-Maxi Principle.
    s_vitamin = "BGW"
    tmp_v, names_v = [], []
    for item in Vitamin_String.split():
        value, color = int(item[:-1]), item[-1]
        tmp_v.append(s_vitamin.index(color))
        names_v.append(value)
    size = len(tmp_v)
    moves_list=hanoiMoves(tmp_v, [2]*size, size)
    return reverseMovesAddNames(moves_list, names_v, s_vitamin)

# code used for testing 1A
if __name__ == '__main__':
    test = "3B 4B 5B 6B"
    dict_colors_names = {"B": "Black", "G": "Gray", "W": "White"}
    print '\n'.join(["swap the element "+str(c[0])+" color from "+dict_colors_names[c[1]]+" to "
                     + dict_colors_names[c[2]] for c in makeAllWhite(test)])
