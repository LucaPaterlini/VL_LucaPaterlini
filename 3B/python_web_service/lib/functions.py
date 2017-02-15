# -*- coding:utf-8 -*-


def move(ndisks, startPeg, endPeg, tmp_v, return_list):
    # move: moves a pile of shapes from the source color to the target color
    if ndisks:
        move(ndisks-1, startPeg, 3-startPeg-endPeg,tmp_v,return_list)
        element = -tmp_v[-1::-1].index(startPeg)-1
        tmp_v[element] = endPeg
        return_list.append([startPeg, endPeg, abs(element+1)])
        move(ndisks-1, 3-startPeg-endPeg, endPeg,tmp_v,return_list)


def hanoiMoves(vitamin, tmp_v, size):
    # hanoiMoves: starts from the final stage searching where to put the next disk from the bottom of the pile
    return_values=[]
    for i in xrange(size-1, -1, -1):
        t = -1-i
        if vitamin[t] == tmp_v[t]:
            continue
        if i > 0:
            move(i, tmp_v[t], 3 - vitamin[t] - tmp_v[t], tmp_v, return_values)
        return_values.append([tmp_v[t], vitamin[t], i])
        tmp_v[t] = vitamin[t]
    return return_values


def reverseMovesAddNames(l,names,s_vitamin):
    # reverseMovesAddNames: changes the order and add the proper names to the array of the moves
    result = []
    for item in l[::-1]:
        tmp = [names[-1 - item[2]], s_vitamin[item[1]], s_vitamin[item[0]]]
        result.append(tmp)
    return result


def makeAllWhite(Vitamin_String):
    # makeAllWhite: return the array of moves needed to set all of the colors
    # of the shapes to white accordingly with the Maxi-Maxi Principle.
    colors = "BGW"
    tmp_v, names_v = [], []
    for item in Vitamin_String.split():
        value, color = int(item[:-1]), item[-1]
        tmp_v.append(colors.index(color))
        names_v.append(value)
    size = len(tmp_v)
    moves_list = hanoiMoves(tmp_v, [2]*size, size)
    return reverseMovesAddNames(moves_list, names_v, colors)


def makeAllWhiteStatus(s_vitamins,list_moves):
    # makeAllWhiteStatus: take as input the start status and the moves and return and array
    #                     with the list of status generated by the moves
    tmp_dict = {int(item[:-1]): item[-1]for item in s_vitamins.split()}
    result = [s_vitamins]
    for c in list_moves:
        tmp_dict[c[0]] = c[-1]
        result.append(' '.join([str(k)+tmp_dict[k] for k in tmp_dict.keys()]))
    return result
