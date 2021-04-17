# from flask import Flask

# app = Flask(__name__)


# @app.route("/")
# def dummy_api():
#     return "Hello word"

# if __name__ == "__main__":
#     app.run()


"""Vehicles Routing Problem (VRP) with Time Windows."""

from ortools.constraint_solver import routing_enums_pb2
from ortools.constraint_solver import pywrapcp
import json
from flask import Flask, jsonify, request
app = Flask(__name__)
v0 = []
v1 = []
v2 = []
v3 = []

coordinate1 = {}
coor1 = {}
coor2 = {}
coor3 = {}
coor4 = {}


def create_data_model():
    """Stores the data for the problem."""
    data = {}
    req_data = request.get_json()
    data['time_matrix'] = req_data['time_matrix']

    time_window = req_data['time_windows']

    arr_time_window = []
    for i in time_window:
        arr_time_window.append(tuple(i))

    data['time_windows'] = arr_time_window

    data['num_vehicles'] = 4
    data['depot'] = 0
    return data


def print_solution(data, manager, routing, solution):
    """Prints solution on console."""
    time_dimension = routing.GetDimensionOrDie('Time')
    total_time = 0
    for vehicle_id in range(data['num_vehicles']):
        index = routing.Start(vehicle_id)
        plan_output = 'Route for vehicle {}:\n'.format(vehicle_id)
        while not routing.IsEnd(index):
            time_var = time_dimension.CumulVar(index)
            plan_output += '{0} Time({1},{2}) -> '.format(
                manager.IndexToNode(index), solution.Min(time_var),
                solution.Max(time_var))

            if vehicle_id == 0:
                my_dict = {"location": manager.IndexToNode(index), "time1": solution.Min(
                    time_var), "time2": solution.Max(time_var)}
                coor1[len(coor1) + 1] = my_dict

            if vehicle_id == 1:
                my_dict = {"location": manager.IndexToNode(index), "time1": solution.Min(
                    time_var), "time2": solution.Max(time_var)}
                coor2[len(coor2) + 1] = my_dict
            if vehicle_id == 2:
                my_dict = {"location": manager.IndexToNode(index), "time1": solution.Min(
                    time_var), "time2": solution.Max(time_var)}
                coor3[len(coor3) + 1] = my_dict
            if vehicle_id == 3:
                my_dict = {"location": manager.IndexToNode(index), "time1": solution.Min(
                    time_var), "time2": solution.Max(time_var)}
                coor4[len(coor4) + 1] = my_dict

            index = solution.Value(routing.NextVar(index))
        time_var = time_dimension.CumulVar(index)
        plan_output += '{0} Time({1},{2})\n'.format(manager.IndexToNode(index),
                                                    solution.Min(time_var),
                                                    solution.Max(time_var))
        plan_output += 'Time of the route: {}min\n'.format(
            solution.Min(time_var))
        # print(plan_output)
        total_time += solution.Min(time_var)
    # print('Total time of all routes: {}min'.format(total_time))


@app.route("/coordinate")
def main():
    """Solve the VRP with time windows."""
    # Instantiate the data problem.
    data = create_data_model()

    # Create the routing index manager.
    manager = pywrapcp.RoutingIndexManager(len(data['time_matrix']),
                                           data['num_vehicles'], data['depot'])

    # Create Routing Model.
    routing = pywrapcp.RoutingModel(manager)

    # Create and register a transit callback.

    def time_callback(from_index, to_index):
        """Returns the travel time between the two nodes."""
        # Convert from routing variable Index to time matrix NodeIndex.
        from_node = manager.IndexToNode(from_index)
        to_node = manager.IndexToNode(to_index)
        return data['time_matrix'][from_node][to_node]

    transit_callback_index = routing.RegisterTransitCallback(time_callback)

    # Define cost of each arc.
    routing.SetArcCostEvaluatorOfAllVehicles(transit_callback_index)

    # Add Time Windows constraint.
    time = 'Time'
    routing.AddDimension(
        transit_callback_index,
        30,  # allow waiting time
        30,  # maximum time per vehicle
        False,  # Don't force start cumul to zero.
        time)
    time_dimension = routing.GetDimensionOrDie(time)
    # Add time window constraints for each location except depot.
    for location_idx, time_window in enumerate(data['time_windows']):
        if location_idx == data['depot']:
            continue
        index = manager.NodeToIndex(location_idx)
        time_dimension.CumulVar(index).SetRange(time_window[0], time_window[1])
    # Add time window constraints for each vehicle start node.
    depot_idx = data['depot']
    for vehicle_id in range(data['num_vehicles']):
        index = routing.Start(vehicle_id)
        time_dimension.CumulVar(index).SetRange(
            data['time_windows'][depot_idx][0],
            data['time_windows'][depot_idx][1])

    # Instantiate route start and end times to produce feasible times.
    for i in range(data['num_vehicles']):
        routing.AddVariableMinimizedByFinalizer(
            time_dimension.CumulVar(routing.Start(i)))
        routing.AddVariableMinimizedByFinalizer(
            time_dimension.CumulVar(routing.End(i)))

    # Setting first solution heuristic.
    search_parameters = pywrapcp.DefaultRoutingSearchParameters()
    search_parameters.first_solution_strategy = (
        routing_enums_pb2.FirstSolutionStrategy.PATH_CHEAPEST_ARC)

    # Solve the problem.
    solution = routing.SolveWithParameters(search_parameters)

    # Print solution on console.
    if solution:
        print_solution(data, manager, routing, solution)

    coordinate = {
        "1": coor1,
        "2": coor2,
        "3": coor3,
        "4": coor4
    }
    return coordinate
    # print(coor1)
    # print(v0)


if __name__ == '__main__':
    # main()
    app.run()
